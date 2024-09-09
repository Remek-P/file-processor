import { useEffect, useRef, useState } from "react";

import VirtualizedList from "@/components/output/display-multiple-suggestions/list/virtualized-list";
import ShortList from "@/components/output/display-multiple-suggestions/list/short-list";

import { compareValues } from "@/utils/sortUtils";
import useWindowDimensions from "@/utils/useWindowSize";

import TexTile from "@/components/tile-type/text-tile/texTile";

import { Loading } from "@carbon/react";

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
  const [sortedSuggestions, setSortedSuggestions] = useState(searchUsers);

  const { height } = useWindowDimensions();

  const reducePerformanceStrain = inputValue.length < 2;

  // TODO: if e.currentTarget.dataset.index === undefined No such user exists message
  const pickSearchedOutput = (e) => {
    setInputValue(e.currentTarget.dataset.value);
  }

  const indexToSort = useRef(IDIndex);

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

    // if browser support web workers and the list is a large list
    if (typeof Worker !== 'undefined' && isLongList) {

      if (searchSuggestionsOrder === undefined) {
        setSortedSuggestions(searchUsers);
        setIsLoading(false);

        // Sort the indexed data based on the value and sort direction (sortedUtils) and sorting index
      } else if (searchSuggestionsOrder || searchSuggestionsOrder === false) {

        const worker = new Worker(new URL("@/public/sortWorker", import.meta.url));

        worker.onmessage = function (event) {
          setSortedSuggestions(event.data);
        };

        const payload = {
          searchSuggestionsOrder,
          searchUsers,
          indexToSort,
        }

        worker.postMessage(payload);
        setIsLoading(false);

        return () => {
          worker.terminate();
        };
      }

    } else {
      // if browser does not support web workers or the list is short
      if (searchSuggestionsOrder === undefined) {
        setSortedSuggestions(searchUsers);
        setIsLoading(false);
      }

      // Sort the indexed data based on the value and sort direction (sortedUtils)
      else if (searchSuggestionsOrder || searchSuggestionsOrder === false) {
        const sorted = [...searchUsers].sort((a, b) => compareValues(
                a[indexToSort.current],
                b[indexToSort.current],
                searchSuggestionsOrder
            )
        );
        setSortedSuggestions(sorted)
        setIsLoading(false);
      }
    }

  }, [searchSuggestionsOrder, searchUsers, IDIndex]);

  console.log("searchUsers", searchUsers)

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