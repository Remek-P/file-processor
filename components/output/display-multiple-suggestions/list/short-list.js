import { useEffect, useMemo, useRef } from "react";

import { compareValues } from "@/utils/sortUtils";

import { Tile } from "@carbon/react";

import classes from "@/components/output/output.module.scss";

function ShortList({
                     IDIndex,
                     searchUsers,
                     labelDataArray,
                     searchSuggestionsOrder,
                     setIsLoading,
                     pickSearchedOutput,
                     handleSort,
                   }) {

  const indexToSort = useRef(IDIndex);

  const sortedSuggestions = useMemo(() => {
    if (searchSuggestionsOrder === undefined) {
      return searchUsers;
    }

    // Sort the indexed data based on the value and sort direction (sortedUtils)
    if (searchSuggestionsOrder || searchSuggestionsOrder === false)
      return [...searchUsers].sort((a, b) => compareValues(
              a[indexToSort.current],
              b[indexToSort.current],
              searchSuggestionsOrder
          )
      );

  }, [searchSuggestionsOrder, searchUsers, IDIndex]);

  useEffect(() => {
    setIsLoading(false)
  },[searchSuggestionsOrder])


  return (
      <table className={classes.searchSuggestionShortListTable}>
        <thead>
        <tr>
          {labelDataArray.map((label, index) => (
              <th key={index}
                  onClick={handleSort}
                  data-value={label[IDIndex]}
                  className={classes.searchSuggestionShortListTableHeader}
                  tabIndex="0">
                <Tile>
                  {label}
                </Tile>
              </th>

          ))}
        </tr>
        </thead>
        <tbody>
        {sortedSuggestions.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((value, colIndex) => (
                  <td data-value={row[IDIndex]}
                      key={colIndex}
                      onClick={pickSearchedOutput}
                      className={classes.searchSuggestionShortListTableRow}
                      tabIndex="0">
                    <Tile>
                      {value}
                    </Tile>
                  </td>
              ))}
            </tr>
        ))}
        </tbody>
      </table>
  );
}

export default ShortList;
