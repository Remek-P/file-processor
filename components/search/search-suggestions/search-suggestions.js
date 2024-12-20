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

// TODO: There are duplicates for some reason in keys
//   const findDuplicateIndex = (arr) => {
//     const seen = new Set();
//     for (let i = 0; i < arr.length; i++) {
//       if (seen.has(arr[i])) {
//         return i; // Return the index of the first duplicate found
//       }
//       seen.add(arr[i]);
//     }
//     return -1; // No duplicates found
//   };
//
//   const findDuplicateIndexes = (arr) => {
//     const valueIndexes = {}; // Object to store indexes of each value
//     const duplicates = []; // Array to store indexes of repeated values
//
//     for (let i = 0; i < arr.length; i++) {
//       if (valueIndexes[arr[i]]) {
//         valueIndexes[arr[i]].push(i); // Add the index to the value's list
//       } else {
//         valueIndexes[arr[i]] = [i]; // First time this value is seen, initialize array with the index
//       }
//     }
//
//     // Collect the indexes of the repeated values
//     for (const value in valueIndexes) {
//       if (valueIndexes[value].length > 1) { // More than one occurrence means it's a duplicate
//         duplicates.push(...valueIndexes[value]); // Add all indexes of the duplicate value
//       }
//     }
//
//     return duplicates;
//   };
//   const a = findDuplicateIndex(userDataArray)
//   const b = findDuplicateIndexes(userDataArray);
//   console.log("a", a)
//   console.log("b", b)
//   console.log("userDataArray", userDataArray)
//   console.log("defaultOrderSearchSuggestions", defaultOrderSearchSuggestions)

  return (
      <datalist id={searchID}>
        {searchArray.map(person => <option key={person} value={person}>{person}</option>)}
      </datalist>
  );
}

export default SearchSuggestions;