import {useMemo} from "react";

import TexTile from "@/components/output/section/text-tile/texTile";
import DisplayMultipleOutputs from "@/components/output/display-multiple-outputs/display-multiple-outputs";
import DisplaySingleOutput from "@/components/output/display-single-output/display-single-output";

import classes from "./section-module.module.scss";

function Sections({ excelFile, inputValue, setInputValue, handleClick }) {

  const labelDataArray = excelFile[1];
  const userData = useMemo(() =>  excelFile.slice(2), [excelFile]);

  const searchUsers = useMemo(() => userData.filter((user) => user.toString().toLowerCase().includes(inputValue)), [inputValue]);
  const colDataArray = searchUsers[0];

  const displayData = () => {

    if (!inputValue)
      return <TexTile text="Please find the user by ID" handleClick={handleClick} />

    else if (searchUsers.length === 1)
      return <DisplaySingleOutput excelFile={excelFile} colDataArray={colDataArray} labelDataArray={labelDataArray} />

    else if (searchUsers.length > 1)
      return <DisplayMultipleOutputs labelDataArray={labelDataArray} setInputValue={setInputValue} searchUsers={searchUsers} />

    else
      return <TexTile text="No such user exists" handleClick={handleClick} />
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