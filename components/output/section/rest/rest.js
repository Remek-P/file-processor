import {Tile} from "@carbon/react";

function Rest({ value,
                index,
                headerDataArray,
                labelDataArray,
                colDataArray
}) {
  return (
      <Tile className={`container${index} shadow`}>
        <h4>{value}</h4>
        {
          headerDataArray.map((header, index) => {
                if (header === value) {
                  return (
                      <div key={index} className={`subContainer subContainer${index}`}>
                        <h6>{ labelDataArray[index] }</h6>
                        <span>{ colDataArray[index] }</span>
                      </div>
                  )
                }
              }
          )
        }
      </Tile>
  );
}

export default Rest;