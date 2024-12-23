import DisplayDataWithoutSubheaders
  from "@/components/output/display-data-without-subheaders/display-data-without-subheaders";
import {Tile} from "@carbon/react";
import { useContext } from "react";
import { HideTileContext } from "@/context/global-context";

function ShowDataWithoutSubheaders({ colDataArray, labelDataArray, hideDB_ID_Tile }) {

  const [ hideTile ] = useContext(HideTileContext);

  return (
      <Tile style={hideTile ? {display: "none"} : null}>
        {colDataArray.map((value, index) => <DisplayDataWithoutSubheaders key={index}
                                                                          value={value}
                                                                          index={index}
                                                                          labelDataArray={labelDataArray}
                                                                          hideDB_ID_Tile={hideDB_ID_Tile}
        />)}
      </Tile>
  );
}

export default ShowDataWithoutSubheaders;