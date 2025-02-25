import { useContext } from "react";

import { HEADER_LABEL } from "@/constants/constants";
import { IsContainingSubheadersContext } from "@/context/global-context";


import DataWithoutSubheaders from "@/components/output/show-data-without-subheaders/show-data-without-subheaders";
import DataWithSubheaders from "@/components/output/show-data-with-subheaders/show-data-with-subheaders";

function DisplaySearchedData({
                               colDataArray,
                               hideDB_ID_Tile,
                               labelDataArray,
                               headerDataArray,
                             }) {

  const { isSubheaders } = useContext(IsContainingSubheadersContext);

  const excelFileUniqueValues = [ ...new Set(headerDataArray) ];

  const filteredOutDB_ID = excelFileUniqueValues.filter(item => item !== HEADER_LABEL);

  return isSubheaders === true
      ? <DataWithSubheaders colDataArray={ colDataArray }
                            labelDataArray={ labelDataArray }
                            headerDataArray={ headerDataArray }
                            filteredOutDB_ID={ filteredOutDB_ID }
                            hideDB_ID_Tile={ hideDB_ID_Tile }
      />
      : <DataWithoutSubheaders colDataArray={ colDataArray }
                               labelDataArray={ labelDataArray }
                               hideDB_ID_Tile={ hideDB_ID_Tile }
      />
}

export default DisplaySearchedData;