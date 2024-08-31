import { useMemo, useRef } from "react";

import TexTile from "@/components/tile-type/text-tile/texTile";
import SearchSuggestions from "@/components/search/suggestions/search-suggestions";

import classes from "@/components/output/output.module.scss";

function DisplayMultipleSuggestions({
                                      IDIndex,
                                      labelDataArray,
                                      searchUsers,
                                      inputValue,
                                      setInputValue,
                                      searchSuggestionsOrder,
                                      setSearchSuggestionsOrder
                                    }) {

  const reducePerformanceStrain = inputValue.length < 3;

  const pickSearchedOutput = (e) => {
    setInputValue(e.target.dataset.value);
  }

  const indexToSort = useRef(IDIndex);

  const sortedSuggestions = useMemo(() => {
    if (searchSuggestionsOrder === undefined) {
      return searchUsers;
    } else if (searchSuggestionsOrder) {
      return [...searchUsers].sort((a, b) => a[indexToSort.current].toString().localeCompare(b[indexToSort.current].toString()));
    } else if (!searchSuggestionsOrder) {
      return [...searchUsers].sort((a, b) => b[indexToSort.current].toString().localeCompare(a[indexToSort.current].toString()));
    }
  }, [searchSuggestionsOrder, searchUsers, IDIndex]);
  
  return (
      <section>
        {
            reducePerformanceStrain && <TexTile text={"Please type at least 3 characters to display search results"}/>
        }

        <ul className={classes.searchContainer}>
          {!reducePerformanceStrain && labelDataArray.map((label, index) =>
              <SearchSuggestions key={index}
                                 label={label}
                                 index={index}
                                 IDIndex={IDIndex}
                                 indexToSort={indexToSort}
                                 sortedSuggestions={sortedSuggestions}
                                 setSearchSuggestionsOrder={setSearchSuggestionsOrder}
                                 pickSearchedOutput={pickSearchedOutput}
              />
          )}
        </ul>
      </section>
  );
}

export default DisplayMultipleSuggestions;