import {createContext, forwardRef, useEffect, useState} from "react";

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
                           searchUsers,
                           searchSuggestionsOrder,
                           setIsLoading,
                           handleSort,
                         }) {

  const [sortedSuggestions, setSortedSuggestions] = useState(searchUsers)

  const { width, height } = useWindowDimensions();
  const virtualizedWidth = width - (0.1 * height);
  const virtualizedHeight = height - (0.2 * height);

  const StickyListContext = createContext();
  StickyListContext.displayName = "StickyListContext";

  useEffect(() => {

    // if browser support web workers
    if (typeof Worker !== 'undefined') {

      if (searchSuggestionsOrder === undefined) {
        setSortedSuggestions(searchUsers);
        setIsLoading(false);

        // Sort the indexed data based on the value and sort direction (sortedUtils) and sorting index
      } else if (searchSuggestionsOrder || searchSuggestionsOrder === false) {

        const worker = new Worker(new URL("@/public/sortWorker", import.meta.url));

        worker.onmessage = function (event) {
          setSortedSuggestions(event.data);
        };

        const payload = {
          searchSuggestionsOrder,
          searchUsers,
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
        setSortedSuggestions(searchUsers);
        setIsLoading(false);
      }

      // Sort the indexed data based on the value and sort direction (sortedUtils)
      else if (searchSuggestionsOrder || searchSuggestionsOrder === false) {
        const sorted = [...searchUsers].sort((a, b) => compareValues(
                a[indexToSort.current],
                b[indexToSort.current],
                searchSuggestionsOrder
            )
        );
        setSortedSuggestions(sorted)
        setIsLoading(false);
      }
    }

  }, [searchSuggestionsOrder, searchUsers, IDIndex, indexToSort]);

  const Row = ({index, style}) => {
    const row = sortedSuggestions[index];
    return (
        <tr className="row" style={style} className={classes.searchSuggestionTableRow}>
          {row.map((value, colIndex) => (
              <td key={colIndex} data-value={row[IDIndex]} onClick={pickSearchedOutput} tabIndex="0">
                <Tile>
                  {value}
                </Tile>
              </td>
          ))}
        </tr>
    )
  };

  const StickyRow = ({index, style}) => (
      <tr style={style}>
        {labelDataArray.map((label, index) => (
            <th key={index} onClick={handleSort} className={classes.searchSuggestionTableHeader} tabIndex="0">
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
            <table ref={ref} {...rest} className={classes.searchSuggestionTable}>
              <thead >
              {stickyIndices.map((index) => (
                  <StickyRow
                      index={index}
                      key={index}
                      style={{top: 0, left: 0, height: 30, position: "sticky", zIndex: "1"}}
                  />
              ))}
              </thead>
              <tbody>{children}</tbody>
            </table>
        )}
      </StickyListContext.Consumer>
  ));

  const ItemWrapper = ({data, index, style}) => {
    const {ItemRenderer, stickyIndices} = data;
    if (stickyIndices && stickyIndices.includes(index)) {
      return null;
    }
    return <ItemRenderer index={index} style={style}/>;
  };

  const StickyList = ({children, stickyIndices, ...rest}) => (
      <StickyListContext.Provider value={{ItemRenderer: children, stickyIndices}}>
        <List itemData={{ItemRenderer: children, stickyIndices}} {...rest}>
          {ItemWrapper}
        </List>
      </StickyListContext.Provider>
  );

  return (
      <StickyList
          height={virtualizedHeight}
          innerElementType={innerElementType}
          itemCount={sortedSuggestions.length}
          itemSize={70}
          stickyIndices={[0]}
          width={virtualizedWidth}
      >
        {Row}
      </StickyList>
  );
}

      export default VirtualizedList;