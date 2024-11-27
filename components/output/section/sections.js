import { useContext, useMemo } from "react";

import TexTile from "@/components/tile-type/text-tile/texTile";
import DisplayMultipleSuggestions from "@/components/output/display-multiple-suggestions/display-multiple-suggestions";
import DisplaySingleOutput from "@/components/output/display-single-output/display-single-output";

import classes from "../output.module.scss";
import { IsContainingSubheadersContext } from "@/context/global-context";

function Sections({
                    IDIndex,
                    headersArray,
                    inputValue,
                    setInputValue,
                    userDataArray,
                    hideDB_ID_Tile,
                    searchSuggestionsOrder,
                    setSearchSuggestionsOrder,
                    handleFocus,
                  }) {

  const { isSubheaders } = useContext(IsContainingSubheadersContext);

  const headerDataArray = isSubheaders ? headersArray[0] : headersArray;
  const labelDataArray = isSubheaders ? headersArray[1] : headersArray;

  const searchRecords = useMemo(() => userDataArray.filter((user) => user.toString().toLowerCase().includes(inputValue.toLowerCase())), [inputValue, userDataArray, IDIndex, searchSuggestionsOrder, isSubheaders]);
  const searchResult = searchRecords.filter(record => record[IDIndex] === inputValue);
  const colDataArray = searchResult[0];

  const displayData = () => {

    if (!inputValue)
      return (
          <div className={classes.select}>
            <TexTile text="Type to search" handleClick={handleFocus} />
          </div>
      )
    else if (searchResult.length === 1)
      return (
              <div className={classes.grid}>
                <DisplaySingleOutput colDataArray={colDataArray}
                                     isSubheaders={isSubheaders}
                                     labelDataArray={labelDataArray}
                                     hideDB_ID_Tile={hideDB_ID_Tile}
                                     headerDataArray={headerDataArray}
                />
              </div>
          )

    else if (searchRecords.length > 1)
      return (
          <div className={classes.grid}>
            <DisplayMultipleSuggestions IDIndex={IDIndex}
                                        inputValue={inputValue}
                                        labelDataArray={labelDataArray}
                                        setInputValue={setInputValue}
                                        searchRecords={searchRecords}
                                        searchSuggestionsOrder={searchSuggestionsOrder}
                                        setSearchSuggestionsOrder={setSearchSuggestionsOrder}
            />
          </div>
          )

    else
      return (
          <div className={classes.select}>
            <TexTile text="No such user data" handleClick={handleFocus} />
          </div>
      )
  }

  return (
      <>
        { displayData() }
      </>

  );
}

export default Sections;