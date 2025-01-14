import React from 'react';
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
                           setIsLoading,
                           handleSort,
                         }) {

  const suggestions = [labelDataArray, ...searchRecords];

  const [ sortedSuggestions, setSortedSuggestions]  = useState(suggestions)
  const [ columnWidths, setColumnWidths ] = useState([]);
  const [ rowHeight, setRowHeight ] = useState(64);
  const [ columnHeight, setColumnHeight ] = useState(undefined);

  const rowRef = useRef();
  const stickyRowRef = useRef();

  const { width, height } = useWindowDimensions();
  const virtualizedWidth = width - (0.05 * width);
  const virtualizedHeight = height - (0.17 * height);

  const StickyListContext = createContext();
  StickyListContext.displayName = "StickyListContext";

  useEffect(() => {

    // if browser support web workers
    if (typeof Worker !== 'undefined') {

      if (searchSuggestionsOrder === undefined) {
        setSortedSuggestions(suggestions);
        setIsLoading(false);

        // Sort the indexed data based on the value and sort direction (sortedUtils) and sorting index
      } else if (searchSuggestionsOrder || searchSuggestionsOrder === false) {

        const worker = new Worker(new URL("@/public/sortWorker", import.meta.url));

        worker.onmessage = function (event) {
          setSortedSuggestions([labelDataArray, ...event.data]);
        };

        const payload = {
          searchSuggestionsOrder,
          searchRecords,
          indexToSort,
        }

        worker.postMessage(payload);
        setIsLoading(false);

        return () => {
          worker.terminate();
        };
      }

    } else {
      // if browser does not support web workers
      if (searchSuggestionsOrder === undefined) {
        setSortedSuggestions(suggestions);
        setIsLoading(false);
      }

      // Sort the indexed data based on the value and sort direction (sortedUtils)
      else if (searchSuggestionsOrder || searchSuggestionsOrder === false) {
        const sorted = [...searchRecords].sort((a, b) => compareValues(
                a[indexToSort.current],
                b[indexToSort.current],
                searchSuggestionsOrder
            )
        );
        setSortedSuggestions([labelDataArray, ...sorted])
        setIsLoading(false);
      }
    }

  }, [searchSuggestionsOrder, searchRecords, IDIndex, indexToSort]);

  useEffect(() => {
    // Collect column widths after the component is rendered
    if (rowRef.current && stickyRowRef.current) {
      const cells = rowRef.current.querySelectorAll('div');
      const widths = Array.from(cells).map(cell => cell.offsetWidth);
      const height = cells[0]?.offsetHeight || 64; // Fallback to 64 if no height

      const stickyCells = stickyRowRef.current.querySelectorAll('div');
      const stickyRowHeight = Math.max(...Array.from(stickyCells).map(cell => cell.offsetHeight));

      setColumnHeight(Math.min(stickyRowHeight, 150)); // Limit to 150px
      setColumnWidths(widths);
      setRowHeight(height);
    }
  }, [sortedSuggestions]);

  const virtualizedItemSize = rowHeight
  const padding = columnHeight - virtualizedItemSize; //TODO: ustawić

  const Row = ({index, style}) => {
    const row = sortedSuggestions[index];
    return (
        <tr ref={rowRef} style={{...style, top: `${parseFloat(style.top) + padding}px`}}>
          {row.map((value, colIndex) => (
              <td key={colIndex}
                  data-value={row[IDIndex]}
                  onClick={pickSearchedOutput}
                  style={{
                    width: columnWidths[colIndex],
                    minWidth: columnWidths[colIndex],
                    maxWidth: columnWidths[colIndex]
                  }}
                  tabIndex="0"
              >
                <Tile>
                  {value}
                </Tile>
              </td>
          ))}
        </tr>
    );
  };

//TODO: scrollbar styling
  const StickyRow = React.memo(({index, style}) => (
      <tr ref={stickyRowRef} style={style}>
        {sortedSuggestions[index].map((label, colIndex) => (
            <th
                key={colIndex}
                onClick={handleSort}
                tabIndex="0"
                style={{ width: columnWidths[colIndex] }} // Set the width
            >
              <Tile style={{
                height: `${columnHeight}px`, overflowY: 'auto' }}>
                {label}
              </Tile>
            </th>
        ))}
      </tr>
  ));

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
          itemSize={virtualizedItemSize}
          stickyIndices={[0]}
          width={virtualizedWidth}
          overscanCount={10}
      >
        {Row}
      </StickyList>
  );
}

      export default VirtualizedList;