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
  const duplicatesLength = duplicates.length;
  if (duplicatesLength !== 0) addWarnings(`Some of the IDs are not a unique value (ID: ${ duplicates.join(', ') })`)
}, [ duplicates ]);

  return (
      <datalist id={ searchID }>
        { searchArray.map(person => <option key={ person } value={ person }>{ person }</option>) }
      </datalist>
  );
}

export default SearchSuggestions;