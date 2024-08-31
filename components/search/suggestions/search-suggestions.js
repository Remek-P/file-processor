import { Tile } from "@carbon/react";

import classes from "@/components/output/output.module.scss";

function SearchSuggestions({
                             label,
                             index,
                             IDIndex,
                             indexToSort,
                             sortedSuggestions,
                             pickSearchedOutput,
                             setSearchSuggestionsOrder,
                           }) {

  const handleSort = (event) => {
    setSearchSuggestionsOrder(prevState => !prevState);
    indexToSort.current = event.target.dataset.index;
  }

  return (
      <li>
        <Tile>
          <h5 className={classes.searchContainerHeader} onClick={handleSort} data-index={index}>{label}</h5>
          <ul className={classes.searchContainerDataContainer}>
            {sortedSuggestions.map(data =>
              <li key={data[IDIndex]}
                  data-value={data[IDIndex]}
                  onClick={pickSearchedOutput}
                  className={classes.searchContainerData}
              >
                {data[index]}
              </li>
            )}
          </ul>
        </Tile>
      </li>
  );
}

export default SearchSuggestions;