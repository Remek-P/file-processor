import { useMemo, useRef } from "react";

import TexTile from "@/components/tile-type/text-tile/texTile";
import SearchSuggestions from "@/components/search/suggestions/search-suggestions";

import classes from "@/components/output/output.module.scss";
import {
  checkForNumber,
  checkForString,
  compareValues,
  regexOverall,
  separateNumbersAndStrings
} from "@/utils/sortUtils";

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
    }

    // Sort the indexed data based on the value and sort direction (sortedUtils)
    if (searchSuggestionsOrder || searchSuggestionsOrder === false)
      [...searchUsers].sort((a, b) => compareValues(
          a[indexToSort.current],
          b[indexToSort.current],
          searchSuggestionsOrder)
      );
  }, [searchSuggestionsOrder, searchUsers, IDIndex]);

  // TODO: Loader indicating change od suggestion order is in progress
  
  return (
      <section>
        {
            reducePerformanceStrain
            && <TexTile text={"Please type at least 3 characters to display search results"}/>
        }

        <ul className={classes.searchContainer}>
          {!reducePerformanceStrain && labelDataArray.map((label, index) =>
              <SearchSuggestions key={index}
                                 label={label}
                                 index={index}
                                 IDIndex={IDIndex}
                                 indexToSort={indexToSort}
                                 sortedSuggestions={sortedSuggestions}
                                 searchSuggestionsOrder={searchSuggestionsOrder}
                                 setSearchSuggestionsOrder={setSearchSuggestionsOrder}
                                 pickSearchedOutput={pickSearchedOutput}
              />
          )}
        </ul>
      </section>
  );
}

export default DisplayMultipleSuggestions;