import {useContext, useMemo} from "react";

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

  const processText = (array) => {
    return array.map(item => {
      if(item === "_id") return item;
      if (typeof item === "string") {
        return item.replace(/_/g, ' '); // Remove the extra closing parenthesis
      }
      else return item;
    });
  }

  const processedLabelDataArray = useMemo(() => {
    return processText(labelDataArray);
  }, labelDataArray);

  const processedHeaderDataArray = useMemo(() => {
    return processText(headerDataArray);
  }, headerDataArray);

  const excelFileUniqueValues = [... new Set(processedHeaderDataArray)];
  
  const filteredOutDB_ID =  excelFileUniqueValues.filter(item => item !== HEADER_LABEL);

  return isSubheaders === true
      ? <ShowDataWithSubheaders colDataArray={colDataArray}
                          labelDataArray={processedLabelDataArray}
                          headerDataArray={processedHeaderDataArray}
                          filteredOutDB_ID={filteredOutDB_ID}
                          hideDB_ID_Tile={hideDB_ID_Tile}
      />
      : <ShowDataWithoutSubheaders colDataArray={colDataArray}
                                   labelDataArray={labelDataArray}
      />
}

export default DisplaySearchedData;