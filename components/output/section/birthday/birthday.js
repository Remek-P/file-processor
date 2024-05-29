import { Tile } from "@carbon/react";

function Birthday({ value, index, colDataArray }) {
  return (
      <Tile className={`container${index} shadow`}>
        <h4>{value}</h4>
        <span>
          {colDataArray[index + 1]}.{colDataArray[index + 3]}.{colDataArray[index + 4]}
        </span>
      </Tile>
  );
}

export default Birthday;