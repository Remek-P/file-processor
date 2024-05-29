import {Tile} from "@carbon/react";

function Id({ index, colDataArray, labelDataArray }) {
  return (
      <Tile className={`container${index} shadow`}>
        <h4>{labelDataArray[index]}</h4>
        <span>{colDataArray[index]}</span>
      </Tile>
  );
}

export default Id;