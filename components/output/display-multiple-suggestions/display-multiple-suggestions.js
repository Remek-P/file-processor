import React, { useCallback, useMemo, useRef } from "react";

import VirtualizedList from "@/components/output/display-multiple-suggestions/list/virtualized-list";
import ShortList from "@/components/output/display-multiple-suggestions/list/short-list";

import useWindowDimensions from "@/hooks/useWindowSize";

function DisplayMultipleSuggestions({
                                      IDIndex,
                                      labelDataArray,
                                      searchRecords,
                                      setInputValue,
                                      searchSuggestionsOrder,
                                      setSearchSuggestionsOrder
                                    }) {

  const { height } = useWindowDimensions();

  const indexToSort = useRef(IDIndex);

  const handleSort = useCallback((event) => {
    // Get the column index from the synthetic event
    const columnIndex = event.currentTarget.cellIndex;

    // Fallback to data attribute if cellIndex is undefined
    if (columnIndex === undefined) {
      indexToSort.current = parseInt(event.currentTarget.dataset.columnIndex, 10);
    } else {
      indexToSort.current = columnIndex;
    }

    setSearchSuggestionsOrder(prevState => !prevState);
  }, []);

  const pickSearchedOutput = (e) => {
    setInputValue(e.currentTarget.dataset.value);
  }

  // TODO: Is reducePerformanceStrain needed?

  const isLongList = searchRecords.length > 500;

  const style = !isLongList ? {overflow: "auto", height: height} : null

  const RenderedList = useMemo(() => {
    return isLongList ? (
        <VirtualizedList
            IDIndex={IDIndex}
            labelDataArray={labelDataArray}
            pickSearchedOutput={pickSearchedOutput}
            searchRecords={searchRecords}
            searchSuggestionsOrder={searchSuggestionsOrder}
            setSearchSuggestionsOrder={setSearchSuggestionsOrder}
            handleSort={handleSort}
            indexToSort={indexToSort}
        />
    ) : (
        <ShortList
            IDIndex={IDIndex}
            searchRecords={searchRecords}
            labelDataArray={labelDataArray}
            searchSuggestionsOrder={searchSuggestionsOrder}
            indexToSort={indexToSort}
            pickSearchedOutput={pickSearchedOutput}
            handleSort={handleSort}
        />
    );
  }, [IDIndex, labelDataArray, searchRecords, searchSuggestionsOrder]);

  return (
    // The section style is necessary for ShortList component, to display sticky menu
    <section style={style}>
      { RenderedList }
    </section>
  );
}

export default DisplayMultipleSuggestions;