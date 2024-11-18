import { useMemo } from "react";

import TexTile from "@/components/tile-type/text-tile/texTile";
import DisplayMultipleSuggestions from "@/components/output/display-multiple-suggestions/display-multiple-suggestions";
import DisplaySingleOutput from "@/components/output/display-single-output/display-single-output";

import classes from "../output.module.scss";

function Sections({
                    IDIndex,
                    file,
                    inputValue,
                    setInputValue,
                    userDataArray,
                    hideDB_ID_Tile,
                    searchSuggestionsOrder,
                    setSearchSuggestionsOrder,
                    handleClick,
                  }) {

  const headerDataArray = file[0];
  const labelDataArray = file[1];

  const searchRecords = useMemo(() => userDataArray.filter((user) => user.toString().toLowerCase().includes(inputValue)), [inputValue, userDataArray, IDIndex, searchSuggestionsOrder]);
  const colDataArray = searchRecords[0];

  const displayData = () => {

    if (!inputValue)
      return (
          <div className={classes.select}>
            <TexTile text="Type to search" handleClick={handleClick} />
          </div>
      )
    else if (searchRecords.length === 1)
      return (
              <div className={classes.grid}>
                <DisplaySingleOutput colDataArray={colDataArray}
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
                                            searchUsers={searchRecords}
                                            searchSuggestionsOrder={searchSuggestionsOrder}
                                            setSearchSuggestionsOrder={setSearchSuggestionsOrder}
                />
              </div>
          )

    else
      return (
          <div className={classes.select}>
            <TexTile text="No such user data" handleClick={handleClick} />
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