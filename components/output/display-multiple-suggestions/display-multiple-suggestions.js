import React, { useCallback, useContext, useMemo, useRef } from "react";

import VirtualizedList from "@/components/output/display-multiple-suggestions/list/virtualized-list";
import ShortList from "@/components/output/display-multiple-suggestions/list/short-list";

import useWindowDimensions from "@/hooks/useWindowSize";
import {IsLoadingContext} from "@/context/global-context";

function DisplayMultipleSuggestions({
                                      IDIndex,
                                      labelDataArray,
                                      searchRecords,
                                      setInputValue,
                                      searchSuggestionsOrder,
                                      setSearchSuggestionsOrder
                                    }) {

  // const [active, setActive] = useState(IDIndex);

  const { height } = useWindowDimensions();

  const [ , setIsLoading ] = useContext(IsLoadingContext);

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

  // TODO: Loader indicating change od suggestion order is in progress
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
            setIsLoading={setIsLoading}
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
            setIsLoading={setIsLoading}
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