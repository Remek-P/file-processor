import DisplayDataWithoutSubheaders
  from "@/components/output/display-data-without-subheaders/display-data-without-subheaders";
import {Tile} from "@carbon/react";
import {useCallback, useContext} from "react";
import { HideTileContext } from "@/context/global-context";

function ShowDataWithoutSubheaders({ colDataArray, labelDataArray, hideDB_ID_Tile }) {

  const [ hideTile ] = useContext(HideTileContext);

  const render = useCallback((value, index) => (
      <DisplayDataWithoutSubheaders
          key={index}
          value={value}
          index={index}
          labelDataArray={labelDataArray}
          hideDB_ID_Tile={hideDB_ID_Tile}
      />
  ), [labelDataArray, hideDB_ID_Tile]);

  return (
      <Tile style={hideTile ? {display: "none"} : null}>
        {colDataArray.map(render)}
      </Tile>
  );
}

export default ShowDataWithoutSubheaders;