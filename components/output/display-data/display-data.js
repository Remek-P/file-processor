import { useContext, useMemo } from "react";

import TextTile from "@/components/tile-type/text-tile/textTile";
import DisplayMultipleSuggestions from "@/components/output/display-multiple-suggestions/display-multiple-suggestions";
import DisplaySearchedData from "@/components/output/display-searched-data/display-searched-data";

import classes from "../output.module.scss";
import { IsContainingSubheadersContext } from "@/context/global-context";

function DisplayData({
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

  const display = () => {

    if (!inputValue)
      return (
          <div className={classes.select}>
            <TextTile text="Type to search" handleClick={handleFocus} />
          </div>
      )
    else if (searchResult.length === 1)
      return (
              <div className={classes.grid}>
                <DisplaySearchedData colDataArray={colDataArray}
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
            <TextTile text="No such user data" handleClick={handleFocus} />
          </div>
      )
  }

  return (
      <>
        { display() }
      </>

  );
}

export default DisplayData;