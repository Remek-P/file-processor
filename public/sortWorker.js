import { compareValues } from "@/utils/sortUtils";

self.onmessage = function (event) {
  const { searchSuggestionsOrder, searchUsers, indexToSort } = event.data;

  if (searchSuggestionsOrder || searchSuggestionsOrder === false) {
    const sorted = [...searchUsers].sort((a, b) => compareValues(
            a[indexToSort.current],
            b[indexToSort.current],
            searchSuggestionsOrder
        )
    );

    self.postMessage(sorted);
  }
}