import { useContext, useEffect, useMemo } from "react";

import DisplayDataWithSubheaders from "@/components/output/display-data-with-subheaders/display-data-with-subheaders";

import { DataToHideContext, ToggleIDViewGlobalContext } from "@/context/global-context";
import { HEADER_LABEL } from "@/constants/constants";

function DataWithSubheaders({
                                  colDataArray,
                                  labelDataArray,
                                  headerDataArray,
                                  filteredOutDB_ID,
                                  hideDB_ID_Tile
                                }) {

  const [ toggleIDView ] = useContext(ToggleIDViewGlobalContext);
  const [ , setDataToHide ] = useContext(DataToHideContext);

  const dataWithID = useMemo(() => {
    return filteredOutDB_ID.map((value, index) => ({
      value,
      id: index,
    }));
  }, [ filteredOutDB_ID ]);

  useEffect(() => {
    setDataToHide(dataWithID);
  }, [ dataWithID ]);

  const idForID_Tile = dataWithID.length;

  const renderRegularData = useMemo(() => {
    return dataWithID.map(data =>
        <DisplayDataWithSubheaders key={ data.id }
                                   id={ data.id }
                                   value={ data.value }
                                   colDataArray={ colDataArray }
                                   labelDataArray={ labelDataArray }
                                   headerDataArray={ headerDataArray }
        />
    );
  }, [filteredOutDB_ID, colDataArray, labelDataArray, headerDataArray]);

  return (
      <>
        { renderRegularData }
        {
            !hideDB_ID_Tile && toggleIDView &&
            <DisplayDataWithSubheaders value={ HEADER_LABEL }
                                       id={ idForID_Tile }
                                       colDataArray={ colDataArray }
                                       labelDataArray={ labelDataArray }
                                       headerDataArray={ headerDataArray }
            />
        }
      </>
  );
}

export default DataWithSubheaders;