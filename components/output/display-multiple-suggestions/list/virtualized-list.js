import React, {useMemo} from 'react';
import { createContext, forwardRef, useEffect, useRef, useState } from "react";

import useWindowDimensions from "@/hooks/useWindowSize";

import {compareValues} from "@/utils/sortUtils";

import { FixedSizeList as List } from "react-window";
import { Tile } from "@carbon/react";

import classes from "@/components/output/output.module.scss";

function VirtualizedList({
                           IDIndex,
                           indexToSort,
                           labelDataArray,
                           pickSearchedOutput,
                           searchRecords,
                           searchSuggestionsOrder,
                           handleSort,
                           setIsLoading,
                         }) {

  const suggestions = useMemo(() => [labelDataArray, ...searchRecords], [labelDataArray, searchRecords]);

  const [ sortedSuggestions, setSortedSuggestions ]  = useState(suggestions)
  const [ columnWidths, setColumnWidths ] = useState([]);
  const [ rowHeight, setRowHeight ] = useState(64);
  const [ columnHeight, setColumnHeight ] = useState(undefined);

  const rowRef = useRef();
  const stickyRowRef = useRef();
  const workerRef = useRef();

  const { width, height } = useWindowDimensions();
  const virtualizedWidth = useMemo(() => width - (0.05 * width), [width]);
  const virtualizedHeight = useMemo(() => height - (0.17 * height), [height]);

  const StickyListContext = createContext();
  StickyListContext.displayName = "StickyListContext";

  const handleSortClick = (columnIndex) => (event) => {
    // Prevent the original event from being lost
    event.persist();

    setIsLoading(true);

    // Create a synthetic event with the correct properties
    const syntheticEvent = {
      ...event,
      currentTarget: {
        ...event.currentTarget,
        cellIndex: columnIndex
      }
    };

    // Use requestAnimationFrame to ensure the loading state is rendered
    requestAnimationFrame(() => {
      handleSort(syntheticEvent);
    });
  };

  const handleSortWorker = useMemo(() => {
    return (workerData) => {
      // Clean up previous worker if it exists
      if (workerRef.current) {
        workerRef.current.terminate();
      }

      const worker = new Worker(new URL("@/public/sortWorker", import.meta.url));
      workerRef.current = worker;

      worker.onmessage = function (event) {
        setSortedSuggestions([labelDataArray, ...event.data]);
        setIsLoading(false);
      };

      worker.onerror = function(error) {
        console.error('Sorting worker error:', error);
        setIsLoading(false);
      };

      worker.postMessage(workerData);

      return () => {
        if (worker) {
          worker.terminate();
        }
      };
    };
  }, [labelDataArray]);

  useEffect(() => {
    if (typeof Worker !== "undefined") {
      if (searchSuggestionsOrder !== undefined) {
        const payload = {
          searchSuggestionsOrder,
          searchRecords,
          indexToSort,
        };
        handleSortWorker(payload);
      } else {
        setSortedSuggestions(suggestions);
        setIsLoading(false);
      }
    } else {
      // Fallback for environments without Web Worker support
      if (searchSuggestionsOrder !== undefined) {
        setIsLoading(true);
        requestAnimationFrame(() => {
          const sorted = [...searchRecords].sort((a, b) =>
              compareValues(a[indexToSort.current], b[indexToSort.current], searchSuggestionsOrder)
          );
          setSortedSuggestions([labelDataArray, ...sorted]);
          setIsLoading(false);
        });
      } else {
        setSortedSuggestions(suggestions);
        setIsLoading(false);
      }
    }
  }, [searchSuggestionsOrder, searchRecords, indexToSort, suggestions, handleSortWorker]);

  // Cleanup worker on component unmount
  useEffect(() => {
    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
      }
    };
  }, []);

  useEffect(() => {
    // Only run if rowRef or stickyRowRef are available
    if (rowRef.current && stickyRowRef.current) {
      const cells = rowRef.current.querySelectorAll('div');
      const newWidths = Array.from(cells).map(cell => cell.offsetWidth);
      const newHeight = cells[0]?.offsetHeight || 64; // Default height to 64 if undefined

      const stickyCells = stickyRowRef.current.querySelectorAll('div');
      const stickyRowHeight = Math.max(...Array.from(stickyCells).map(cell => cell.offsetHeight));

      // Check if column widths or row height need to be updated
      if (newWidths.some((width, i) => width !== columnWidths[i])) {
        setColumnWidths(newWidths);
      }

      if (newHeight !== rowHeight) {
        setRowHeight(newHeight);
      }

      if (stickyRowHeight !== columnHeight) {
        setColumnHeight(Math.min(stickyRowHeight, 150));
      }
    }
  }, [ sortedSuggestions, virtualizedWidth, virtualizedHeight ]); // Only rerun if sortedSuggestions change

  const padding = columnHeight - rowHeight;

  const Row = React.memo(({ index, style }) => {
    const row = sortedSuggestions[index];
    return (
        <tr ref={rowRef} style={{ ...style, top: `${parseFloat(style.top) + padding}px` }}>
          {row.map((value, colIndex) => (
              <td
                  key={colIndex}
                  data-value={row[IDIndex]}
                  onClick={pickSearchedOutput}
                  style={{
                    width: columnWidths[colIndex],
                    minWidth: columnWidths[colIndex],
                    maxWidth: columnWidths[colIndex]
                  }}
                  tabIndex="0"
              >
                <Tile>{ value }</Tile>
              </td>
          ))}
        </tr>
    );
  }, (prevProps, nextProps) => prevProps.index === nextProps.index);

//TODO: scrollbar styling
  const StickyRow = React.memo(({index, style}) => (
      <tr ref={stickyRowRef} style={style}>
        {sortedSuggestions[index].map((label, colIndex) => (
            <th
                key={colIndex}
                onClick={handleSortClick(colIndex)}
                tabIndex="0"
                style={{ width: columnWidths[colIndex] }} // Set the width
                data-column-index={colIndex} // Add data attribute as backup
            >
              <Tile style={{
                height: `${columnHeight}px`, overflowY: 'auto' }}>
                {label}
              </Tile>
            </th>
        ))}
      </tr>
  ), (prevProps, nextProps) => prevProps.index === nextProps.index);

  const innerElementType = forwardRef(({children, ...rest}, ref) => (
      <StickyListContext.Consumer>
        {({stickyIndices}) => (
            <table ref={ref} {...rest} className={classes.searchSuggestionLargeListTable}>
              <thead>
              {stickyIndices.map((index) => (
                  <StickyRow
                      index={index}
                      key={index}
                      style={{top: 0, left: 0, height: `${columnHeight}px`, position: "sticky", zIndex: "1"}}
                  />
              ))}
              </thead>
              <tbody>{children}</tbody>
            </table>
        )}
      </StickyListContext.Consumer>
  ));

  const ItemWrapper = ({data, index, style}) => {
    const { ItemRenderer, stickyIndices } = data;
    if (stickyIndices && stickyIndices.includes(index)) {
      return null;
    }
    return <ItemRenderer index={index} style={style} />;
  };

  const StickyList = ({children, stickyIndices, ...rest}) => (
      <StickyListContext.Provider value={{ ItemRenderer: children, stickyIndices }}>
        <List itemData={{ ItemRenderer: children, stickyIndices }} {...rest}>
          { ItemWrapper }
        </List>
      </StickyListContext.Provider>
  );

  return (
        <StickyList
            height={virtualizedHeight}
            innerElementType={innerElementType}
            itemCount={sortedSuggestions.length}
            itemSize={rowHeight}
            stickyIndices={[0]}
            width={virtualizedWidth}
            overscanCount={12}
        >
          { Row }
        </StickyList>
  );
}

      export default VirtualizedList;