import { compareValues } from "@/utils/sortUtils";

self.onmessage = function (event) {
  const { searchSuggestionsOrder, searchRecords, indexToSort } = event.data;

  if (searchSuggestionsOrder || searchSuggestionsOrder === false) {
    const sorted = [...searchRecords].sort((a, b) => compareValues(
            a[indexToSort.current],
            b[indexToSort.current],
            searchSuggestionsOrder
        )
    );

    self.postMessage(sorted);
  }
}