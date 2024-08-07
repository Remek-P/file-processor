import {useMemo} from "react";

import TexTile from "@/components/tile-type/text-tile/texTile";
import DisplayMultipleOutputs from "@/components/output/display-multiple-outputs/display-multiple-outputs";
import DisplaySingleOutput from "@/components/output/display-single-output/display-single-output";

import classes from "../output.module.scss";

function Sections({
                    excelFile,
                    inputValue,
                    setInputValue,
                    handleClick,
                    decimal,
                    setDecimal
                  }) {

  const labelDataArray = excelFile[1];
  const userData = useMemo(() =>  excelFile.slice(2), [excelFile]);

  const searchRecords = useMemo(() => userData.filter((user) => user.toString().toLowerCase().includes(inputValue)), [inputValue]);
  const colDataArray = searchRecords[0];

  const displayData = () => {

    if (!inputValue)
      return (
          <div className={classes.select}>
            <TexTile text="Search any user" handleClick={handleClick} />
          </div>
      )
    else if (searchRecords.length === 1)
      return (
              <div className={classes.grid}>
                <DisplaySingleOutput excelFile={excelFile}
                                     colDataArray={colDataArray}
                                     labelDataArray={labelDataArray}
                                     decimal={decimal}
                                     setDecimal={setDecimal}
                />
              </div>
          )

    else if (searchRecords.length > 1)
      return (
              <div className={classes.grid}>
                <DisplayMultipleOutputs inputValue={inputValue}
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