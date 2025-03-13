import { findDuplicatesIn1DArray } from "@/utils/general";
import { useContext, useEffect, useMemo } from "react";
import { WarningsContext } from "@/context/global-context";

function SearchSuggestions({
                             IDIndex,
                             searchID,
                             userDataArray,
                             searchSuggestionsOrder
                           }) {

  const { addWarnings } = useContext(WarningsContext);


  const defaultOrderSearchSuggestions = userDataArray.map(id => id[IDIndex]);
  const ascendingOrderSearchSuggestions = [ ...defaultOrderSearchSuggestions ].sort((a, b) => a.toString().localeCompare(b.toString()));
  const descendingOrderSearchSuggestions = [ ...defaultOrderSearchSuggestions ].sort((a, b) => b.toString().localeCompare(a.toString()));

  const searchArray = searchSuggestionsOrder === undefined
      ? defaultOrderSearchSuggestions
      : searchSuggestionsOrder
          ? ascendingOrderSearchSuggestions
          : descendingOrderSearchSuggestions;

  const duplicates = useMemo(() => findDuplicatesIn1DArray(searchArray),
      [ userDataArray, IDIndex ] );
useEffect(() => {
  if (duplicates.length !== 0) addWarnings("Some of the IDs, are not unique values")
}, [ duplicates ]);

  return (
      <datalist id={ searchID }>
        { searchArray.map(person => <option key={ person } value={ person }>{ person }</option>) }
      </datalist>
  );
}

export default SearchSuggestions;