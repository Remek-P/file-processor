import { useContext } from "react";

import { HEADER_LABEL } from "@/constants/constants";
import { IsContainingSubheadersContext } from "@/context/global-context";


import ShowDataWithoutSubheaders from "@/components/output/show-data-without-subheaders/show-data-without-subheaders";
import ShowDataWithSubheaders from "@/components/output/show-data-with-subheaders/show-data-with-subheaders";

function DisplaySearchedData({
                               colDataArray,
                               hideDB_ID_Tile,
                               labelDataArray,
                               headerDataArray,
                             }) {

  const { isSubheaders } = useContext(IsContainingSubheadersContext);

  const excelFileUniqueValues = [... new Set(headerDataArray)];
  
  const filteredOutDB_ID =  excelFileUniqueValues.filter(item => item !== HEADER_LABEL);

  return isSubheaders === true
      ? <ShowDataWithSubheaders colDataArray={colDataArray}
                          labelDataArray={labelDataArray}
                          headerDataArray={headerDataArray}
                          filteredOutDB_ID={filteredOutDB_ID}
                          hideDB_ID_Tile={hideDB_ID_Tile}
      />
      : <ShowDataWithoutSubheaders colDataArray={colDataArray}
                                   labelDataArray={labelDataArray}
      />
}

export default DisplaySearchedData;