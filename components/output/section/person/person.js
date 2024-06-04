import { Tile} from "@carbon/react";

function Person({ index, colDataArray, labelDataArray}) {
  return (
      <Tile className={`container container${index} shadow`}>

        <div>
          <h4>{labelDataArray[index]}</h4>
          <span>{colDataArray[index]}</span>
        </div>

        <div>
          <h4>{labelDataArray[index + 1]}</h4>
          <span>
          {
            colDataArray[index + 2]}.{colDataArray[index + 4]}.{colDataArray[index + 5]
          }
          </span>
        </div>


      </Tile>
  );
}

export default Person;