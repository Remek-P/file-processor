import {Tile} from "@carbon/react";

function Id({ index, colDataArray, labelDataArray}) {
  // console.log(colDataArray)
  // console.log(index)
  return (
      <Tile className={`container${index} shadow`}>
        <h4>{labelDataArray[index]}</h4>
        <span>{colDataArray[index]}</span>
        {/*Hardcoded because the Excel title has a typo*/}
        <h4>Birthday</h4>
        <span>
          {colDataArray[index + 2]}.{colDataArray[index + 4]}.{colDataArray[index + 5]}
        </span>
      </Tile>
  );
}

export default Id;