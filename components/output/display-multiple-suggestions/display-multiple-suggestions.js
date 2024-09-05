import {useMemo, useRef, useState} from "react";

import TexTile from "@/components/tile-type/text-tile/texTile";
import SearchSuggestions from "@/components/search/suggestions/search-suggestions";

import { compareValues } from "@/utils/sortUtils";

import classes from "@/components/output/output.module.scss";
import {Tile} from "@carbon/react";

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

  const handleSort = (event) => {
    //TODO: each time the icon is pressed, the sorting should start from ascending and not oscillating

    indexToSort.current = event.currentTarget.cellIndex;
    setSearchSuggestionsOrder(prevState => !prevState);
    // if (+event.currentTarget.dataset.index === index) {
    //   setShowIcon(index);
    //   setActive(index);
    // }
  }

  return (
      <section>
        {
            reducePerformanceStrain
            && <TexTile text={"Please type at least 2 characters to display search results"}/>
        }

        {/*<ul className={classes.searchContainer}>*/}
        {/*  {!reducePerformanceStrain && labelDataArray.map((label, index) =>*/}
        {/*      <SearchSuggestions key={index}*/}
        {/*                         label={label}*/}
        {/*                         // active={active}*/}
        {/*                         // setActive={setActive}*/}
        {/*                         index={index}*/}
        {/*                         IDIndex={IDIndex}*/}
        {/*                         indexToSort={indexToSort}*/}
        {/*                         sortedSuggestions={sortedSuggestions}*/}
        {/*                         searchSuggestionsOrder={searchSuggestionsOrder}*/}
        {/*                         setSearchSuggestionsOrder={setSearchSuggestionsOrder}*/}
        {/*                         pickSearchedOutput={pickSearchedOutput}*/}
        {/*      />*/}
        {/*  )}*/}
        {/*  {!reducePerformanceStrain && labelDataArray.map((label, index) =>*/}
        {/*      <li key={index}>*/}
        {/*        {label}*/}
        {/*      </li>*/}
        {/*  )}*/}
        {/*</ul>*/}

        <table>
          <thead>
          <tr>
            {labelDataArray.map((label, index) => (
                <th key={index} onClick={handleSort}> {/* Assuming columns correspond to index */}
                  <Tile>
                    {label}
                  </Tile>
                </th>

            ))}
          </tr>
          </thead>
          <tbody>
          {sortedSuggestions.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((value, colIndex) => (
                    <td data-value={row[IDIndex]} key={colIndex} onClick={pickSearchedOutput}>
                      <Tile>
                        {value}
                      </Tile>
                    </td>
                ))}
              </tr>
          ))}
          </tbody>
        </table>

      </section>
  );
}

          export default DisplayMultipleSuggestions;