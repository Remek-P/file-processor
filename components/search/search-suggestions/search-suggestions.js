function SearchSuggestions({ IDIndex, searchID, userDataArray, searchSuggestionsOrder }) {

  const defaultOrderSearchSuggestions = userDataArray.map(id => id[IDIndex]);
  const ascendingOrderSearchSuggestions = [...defaultOrderSearchSuggestions].sort((a, b) => a.toString().localeCompare(b.toString()));
  const descendingOrderSearchSuggestions = [...defaultOrderSearchSuggestions].sort((a, b) => b.toString().localeCompare(a.toString()));
  // TODO: change does not work
  const searchArray = searchSuggestionsOrder === undefined
      ? defaultOrderSearchSuggestions
      : searchSuggestionsOrder
          ? ascendingOrderSearchSuggestions
          : descendingOrderSearchSuggestions;

  return (
      <datalist id={searchID}>
        {searchArray.map(person => <option key={person} value={person}>{person}</option>)}
      </datalist>
  );
}

export default SearchSuggestions;