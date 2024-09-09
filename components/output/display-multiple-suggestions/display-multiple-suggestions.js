import { useEffect, useMemo, useRef, useState } from "react";

import TexTile from "@/components/tile-type/text-tile/texTile";

import { compareValues } from "@/utils/sortUtils";

import { Loading } from "@carbon/react";

import VirtualizedList from "@/components/output/display-multiple-suggestions/list/virtualized-list";
import ShortList from "@/components/output/display-multiple-suggestions/list/short-list";
import useWindowDimensions from "@/utils/useWindowSize";

function DisplayMultipleSuggestions({
                                      IDIndex,
                                      labelDataArray,
                                      searchUsers,
                                      inputValue,
                                      setInputValue,
                                      searchSuggestionsOrder,
                                      setSearchSuggestionsOrder
                                    }) {

  // const [active, setActive] = useState(IDIndex);
  
  const [isLoading, setIsLoading] = useState(false);

  const { height } = useWindowDimensions();

  const reducePerformanceStrain = inputValue.length < 2;

  // TODO: if e.currentTarget.dataset.index === undefined No such user exists message
  const pickSearchedOutput = (e) => {
    setInputValue(e.currentTarget.dataset.value);
  }

  const indexToSort = useRef(IDIndex);

  const sortedSuggestions = useMemo(() => {
    if (searchSuggestionsOrder === undefined) {
      return searchUsers;
    }

    // Sort the indexed data based on the value and sort direction (sortedUtils)
    if (searchSuggestionsOrder || searchSuggestionsOrder === false)
      return [...searchUsers].sort((a, b) => compareValues(
          a[indexToSort.current],
          b[indexToSort.current],
          searchSuggestionsOrder
          )
      );

  }, [searchSuggestionsOrder, searchUsers, IDIndex]);

  // TODO: Loader indicating change od suggestion order is in progress
  // TODO: Is reducePerformanceStrain needed?

  const isLongList = searchUsers.length > 500;

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

  useEffect(() => {
    setIsLoading(false);
  }, [sortedSuggestions]);



  return (
      // The section style is necessary for ShortList component, to display sticky menu
      <section style={!isLongList ? {overflow: "auto", height: height} : null}>
        {
            reducePerformanceStrain
            && <TexTile text={"Please type at least 2 characters to display search results"}/>
        }

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
                           labelDataArray={labelDataArray}
                           sortedSuggestions={sortedSuggestions}
                           handleSort={handleSort}
                           pickSearchedOutput={pickSearchedOutput}/>
              : <VirtualizedList IDIndex={IDIndex}
                                 labelDataArray={labelDataArray}
                                 sortedSuggestions={sortedSuggestions}
                                 handleSort={handleSort}
                                 pickSearchedOutput={pickSearchedOutput}
              />
        }


      </section>
  );
}

export default DisplayMultipleSuggestions;