import { Tile } from "@carbon/react";

import classes from "@/components/output/output.module.scss";
import { SortAscending, SortDescending } from "@carbon/icons-react";
import {useState} from "react";

function SearchSuggestions({
                             label,
                             index,
                             IDIndex,
                             indexToSort,
                             sortedSuggestions,
                             pickSearchedOutput,
                             searchSuggestionsOrder,
                             setSearchSuggestionsOrder,
                           }) {


  const [showIcon, setShowIcon] = useState(false)

  const sortIcon = searchSuggestionsOrder === undefined
      ? null
      : searchSuggestionsOrder
          ? <SortAscending/>
          : <SortDescending/>;

  const handleSort = (event) => {
    indexToSort.current = event.currentTarget.dataset.index;
    setSearchSuggestionsOrder(prevState => !prevState);
  }

  return (
      <li>
        <Tile>
          <h5 role="button"
              tabIndex="0"
              onClick={handleSort}
              onKeyDown={(e) => e.key === 'Enter' && handleSort(e)}
              data-index={index}
              className={classes.searchContainerHeader}
          >
            <span>{ label }</span>
            { showIcon && sortIcon }
          </h5>
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