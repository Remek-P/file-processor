import DisplayDataWithoutSubheaders
  from "@/components/output/display-data-without-subheaders/display-data-without-subheaders";
import {Tile} from "@carbon/react";

function ShowDataWithoutSubheaders({ colDataArray, labelDataArray }) {
  return (
      <Tile>
        {colDataArray.map((value, index) => <DisplayDataWithoutSubheaders key={index}
                                                                          value={value}
                                                                          index={index}
                                                                          labelDataArray={labelDataArray}
        />)}
      </Tile>
  );
}

export default ShowDataWithoutSubheaders;