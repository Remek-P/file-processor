import DisplayDataWithoutSubheaders
  from "@/components/output/display-data-without-subheaders/display-data-without-subheaders";
import { Tile } from "@carbon/react";
import { useContext, useEffect, useMemo } from "react";
import { DataToHideContext } from "@/context/global-context";

function DataWithoutSubheaders({ colDataArray, labelDataArray, hideDB_ID_Tile }) {

  const [ , setDataToHide ] = useContext(DataToHideContext);

  const dataWithID = useMemo(() => {
    return labelDataArray.map((value, index) => ({
      value,
      id: index,
    }));
  }, [ colDataArray ]);

  useEffect(() => {
    setDataToHide(dataWithID);
  }, [dataWithID]);
  // TODO: Check if using useMemo on "return" will improve performance when hiding Tile
  return (
      <Tile>
        { dataWithID.map((data, index) =>
            <DisplayDataWithoutSubheaders key={ data.id }
                                          id={ data.id }
                                          index={ index }
                                          label={ data.value }
                                          colDataArray={ colDataArray }
                                          hideDB_ID_Tile={ hideDB_ID_Tile }
            />) }
      </Tile>
  );
}

export default DataWithoutSubheaders;