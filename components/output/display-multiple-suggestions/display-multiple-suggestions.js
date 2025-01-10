import { useRef, useState } from "react";

import VirtualizedList from "@/components/output/display-multiple-suggestions/list/virtualized-list";
import ShortList from "@/components/output/display-multiple-suggestions/list/short-list";

import useWindowDimensions from "@/hooks/useWindowSize";

import { Loading } from "@carbon/react";

function DisplayMultipleSuggestions({
                                      IDIndex,
                                      labelDataArray,
                                      searchRecords,
                                      setInputValue,
                                      searchSuggestionsOrder,
                                      setSearchSuggestionsOrder
                                    }) {

  // const [active, setActive] = useState(IDIndex);
  
  const [ isLoading, setIsLoading ] = useState(false);

  const { height } = useWindowDimensions();

  const indexToSort = useRef(IDIndex);

  const handleSort = (event) => {
    //TODO: each time the icon is pressed, the sorting should start from ascending and not oscillating
    setIsLoading(true);
    indexToSort.current = event.currentTarget.cellIndex;
    setSearchSuggestionsOrder(prevState => !prevState);

    // if (+event.currentTarget.dataset.index === index) {
    //   setShowIcon(index);
    //   setActive(index);
    // }
  }

  // TODO: if e.currentTarget.dataset.index === undefined No such user exists message
  const pickSearchedOutput = (e) => {
    setInputValue(e.currentTarget.dataset.value);
  }

  // TODO: Loader indicating change od suggestion order is in progress
  // TODO: Is reducePerformanceStrain needed?

  const isLongList = searchRecords.length > 500;

  return (
    // The section style is necessary for ShortList component, to display sticky menu
    <section style={!isLongList ? {overflow: "auto", height: height} : null}>
      <Loading active={isLoading}
               description="Performing sorting"
               id="sortLoading"
               small={false}
               withOverlay={true}
               className={null}
      />
      {
        !isLongList
            ? <ShortList IDIndex={IDIndex}
                         searchRecords={searchRecords}
                         labelDataArray={labelDataArray}
                         searchSuggestionsOrder={searchSuggestionsOrder}
                         setIsLoading={setIsLoading}
                         indexToSort={indexToSort}
                         pickSearchedOutput={pickSearchedOutput}
                         handleSort={handleSort}
            />
            : <VirtualizedList IDIndex={IDIndex}
                               labelDataArray={labelDataArray}
                               pickSearchedOutput={pickSearchedOutput}
                               searchRecords={searchRecords}
                               searchSuggestionsOrder={searchSuggestionsOrder}
                               handleSort={handleSort}
                               setIsLoading={setIsLoading}
                               indexToSort={indexToSort}
            />
      }
    </section>
  );
}

export default DisplayMultipleSuggestions;