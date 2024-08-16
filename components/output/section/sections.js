import { useMemo } from "react";

import TexTile from "@/components/tile-type/text-tile/texTile";
import DisplayMultipleSuggestions from "@/components/output/display-multiple-suggestions/display-multiple-suggestions";
import DisplaySingleOutput from "@/components/output/display-single-output/display-single-output";

import classes from "../output.module.scss";

function Sections({
                    IDIndex,
                    decimal,
                    excelFile,
                    inputValue,
                    setInputValue,
                    toggleIDView,
                    hideDB_ID_Tile,
                    excludedArray,
                    setExcludedArray,
                    handleClick,
                  }) {

  const labelDataArray = excelFile[1];
  const userData = useMemo(() =>  excelFile.slice(2), [excelFile]);

  const searchRecords = useMemo(() => userData.filter((user) => user.toString().toLowerCase().includes(inputValue)), [inputValue, excelFile]);
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
                <DisplaySingleOutput decimal={decimal}
                                     excelFile={excelFile}
                                     toggleIDView={toggleIDView}
                                     colDataArray={colDataArray}
                                     labelDataArray={labelDataArray}
                                     hideDB_ID_Tile={hideDB_ID_Tile}
                                     excludedArray={excludedArray}
                                     setExcludedArray={setExcludedArray}
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