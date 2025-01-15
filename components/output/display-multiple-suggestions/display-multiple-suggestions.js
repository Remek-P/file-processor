import {useCallback, useMemo, useRef } from "react";

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

  // const [active, setActive] = useState(IDIndex);

  const { height } = useWindowDimensions();

  const indexToSort = useRef(IDIndex);

  const handleSort = useCallback((event) => {
    // TODO: each time the icon is pressed, the sorting should start from ascending and not oscillating
    indexToSort.current = event.currentTarget.cellIndex;
    setSearchSuggestionsOrder(prevState => !prevState);

    // if (+event.currentTarget.dataset.index === index) {
    //   setShowIcon(index);
    //   setActive(index);
    // }
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