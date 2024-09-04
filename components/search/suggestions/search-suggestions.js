import {useEffect, useState} from "react";

import DisplayValues from "@/components/search/suggestions/display-data/display-values";
import DisplayLabels from "@/components/search/suggestions/display-data/display-labels";

import {Tile} from "@carbon/react";

import classes from "@/components/output/output.module.scss";

function SearchSuggestions({
                             label,
                             active,
                             setActive,
                             index,
                             IDIndex,
                             indexToSort,
                             sortedSuggestions,
                             pickSearchedOutput,
                             searchSuggestionsOrder,
                             setSearchSuggestionsOrder,
                           }) {

  // const [showIcon, setShowIcon] = useState(searchSuggestionsOrder);

  // useEffect(() => {
  //   setShowIcon(index);
  // }, [searchSuggestionsOrder]);

  const handleSort = (event) => {
    //TODO: each time the icon is pressed, the sorting should start from ascending and not oscillating
    indexToSort.current = event.currentTarget.dataset.index;
    setSearchSuggestionsOrder(prevState => !prevState);
    // if (+event.currentTarget.dataset.index === index) {
    //   setShowIcon(index);
    //   setActive(index);
    // }
  }


  return (
      <li>
        <Tile>
          <DisplayLabels index={index}
                         // active={active}
                         label={label}
                         // showIcon={showIcon}
                         searchSuggestionsOrder={searchSuggestionsOrder}
                         handleSort={handleSort}
          />
          <ul className={classes.searchContainerDataContainer}>
            {sortedSuggestions.map((data, i) =>
                <DisplayValues key={i}
                               data={data}
                               index={index}
                               IDIndex={IDIndex}
                               pickSearchedOutput={pickSearchedOutput}
                />
            )}
          </ul>
        </Tile>
      </li>
  );
}

export default SearchSuggestions;