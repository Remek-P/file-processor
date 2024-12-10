import { useContext } from "react";

import Show from "@/components/output/show/show";

import { HEADER_LABEL } from "@/constants/constants";
import { ToggleIDViewGlobalContext } from "@/context/global-context";

function DisplaySearchedData({
                               colDataArray,
                               hideDB_ID_Tile,
                               labelDataArray,
                               headerDataArray,
                             }) {

  const [ toggleIDView ] = useContext(ToggleIDViewGlobalContext);

  const excelFileUniqueValues = [... new Set(headerDataArray)];
  
  const filteredOutDB_ID =  excelFileUniqueValues.filter(item => item !== HEADER_LABEL);

  // return <DetectDataSubheaders colDataArray={colDataArray}
  //                              labelDataArray={labelDataArray}
  //                              headerDataArray={headerDataArray}
  //                              filteredOutDB_ID={filteredOutDB_ID}
  //                              excelFileUniqueValues={excelFileUniqueValues}
  // />

  return (
      <>

        {
          filteredOutDB_ID.map(value =>
              <Show key={value}
                    value={value}
                    colDataArray={colDataArray}
                    labelDataArray={labelDataArray}
                    headerDataArray={headerDataArray}
              />
          )
        }
        {
          !hideDB_ID_Tile && toggleIDView &&
            <Show value={HEADER_LABEL}
                  colDataArray={colDataArray}
                  labelDataArray={labelDataArray}
                  headerDataArray={headerDataArray}
            />
        }
      </>
  );
}

export default DisplaySearchedData;