import {useMemo} from "react";

import TexTile from "@/components/tile-type/text-tile/texTile";
import DisplayMultipleOutputs from "@/components/output/display-multiple-outputs/display-multiple-outputs";
import DisplaySingleOutput from "@/components/output/display-single-output/display-single-output";

import classes from "./section-module.module.scss";

function Sections({ excelFile, inputValue, setInputValue, handleClick }) {

  const labelDataArray = excelFile[1];
  const userData = useMemo(() =>  excelFile.slice(2), [excelFile]);

  const searchRecords = useMemo(() => userData.filter((user) => user.toString().toLowerCase().includes(inputValue)), [inputValue]);
  const colDataArray = searchRecords[0];

  const displayData = () => {

    if (!inputValue)
      return <TexTile text="Please find the user by ID" handleClick={handleClick} />

    else if (searchRecords.length === 1)
      return <DisplaySingleOutput excelFile={excelFile} colDataArray={colDataArray} labelDataArray={labelDataArray} />

    else if (searchRecords.length > 1)
      return <DisplayMultipleOutputs inputValue={inputValue} labelDataArray={labelDataArray} setInputValue={setInputValue} searchUsers={searchRecords} />

    else
      return <TexTile text="No such user data" handleClick={handleClick} />
  }

  return (
      <div className={classes.grid}>
        {
          displayData()
        }
      </div>
  );
}

export default Sections;