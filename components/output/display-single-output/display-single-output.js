import Show from "@/components/output/section/show/show";

import { headerLabel } from "@/constants/constants";
import {useContext} from "react";
import {ToggleIDViewGlobalContext} from "@/context/global-context";

function DisplaySingleOutput({
                               excelFile,
                               colDataArray,
                               labelDataArray,
                               hideDB_ID_Tile,
                             }) {

  const [toggleIDView] = useContext(ToggleIDViewGlobalContext);
  console.log("labelDataArray", labelDataArray)

  const headerDataArray = excelFile[0];

  const excelFileUniqueValues = [... new Set(headerDataArray)];
  
  const filteredOutDB_ID =  excelFileUniqueValues.filter(item => item !== headerLabel);

  console.log("DisplaySingleOutput", hideDB_ID_Tile)
  
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
            !hideDB_ID_Tile && toggleIDView
            && <Show value={headerLabel}
                     colDataArray={colDataArray}
                     labelDataArray={labelDataArray}
                     headerDataArray={headerDataArray}
            />
        }
      </>
  );
}

export default DisplaySingleOutput;