import {createContext, forwardRef, useEffect, useRef, useState} from "react";

import useWindowDimensions from "@/utils/useWindowSize";

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

  const rowRef = useRef();

  const { width, height } = useWindowDimensions();
  const virtualizedWidth = width - (0.05 * width);
  const virtualizedHeight = height - (0.2 * height);

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
    if (rowRef.current) {
      const cells = rowRef.current.querySelectorAll('td');
      const widths = Array.from(cells).map(cell => cell.offsetWidth);
      setColumnWidths(widths);
    }
  }, [sortedSuggestions]);

  const stickyHeight = 30;
  const padding = 86 - stickyHeight *2;

  const Row = ({index, style}) => {
    const row = sortedSuggestions[index];
    return (
        <tr ref={rowRef} style={{...style, top: `${parseFloat(style.top) + padding}px`}}>
          {row.map((value, colIndex) => (
              <td key={colIndex}
                  data-value={row[IDIndex]}
                  onClick={pickSearchedOutput}
                  style={{ width: columnWidths[colIndex], minWidth: columnWidths[colIndex] }}
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

  const StickyRow = ({index, style}) => (
      <tr style={style}>
        {sortedSuggestions[index].map((label, colIndex) => (
            <th
                key={colIndex}
                onClick={handleSort}
                tabIndex="0"
                style={{ width: columnWidths[colIndex] }} // Set the width
            >
              <Tile>
                {label}
              </Tile>
            </th>
        ))}
      </tr>
  );


  const innerElementType = forwardRef(({children, ...rest}, ref) => (
      <StickyListContext.Consumer>
        {({stickyIndices}) => (
            <table ref={ref} {...rest} className={classes.searchSuggestionLargeListTable}>
              <thead>
              {stickyIndices.map((index) => (
                  <StickyRow
                      index={index}
                      key={index}
                      style={{top: 0, left: 0, height: `${stickyHeight}px`, position: "sticky", zIndex: "1"}}
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
          itemSize={50}
          stickyIndices={[0]}
          width={virtualizedWidth}
      >
        {Row}
      </StickyList>
  );
}

      export default VirtualizedList;