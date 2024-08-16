import Show from "@/components/output/section/show/show";
import {headerLabel, idLabel} from "@/constants/constants";

function DisplaySingleOutput({
                               excelFile,
                               colDataArray,
                               labelDataArray,
                               decimal,
                               toggleIDView,
                               hideDB_ID_Tile,
                               excludedArray,
                               setExcludedArray
                             }) {

  const headerDataArray = excelFile[0];

  const excelFileUniqueValues = [... new Set(headerDataArray)];
  
  const filteredOutDB_ID =  excelFileUniqueValues.filter(item => item !== headerLabel);

  return (
      <>
        {
          filteredOutDB_ID.map(value => <Show key={value}
                                              value={value}
                                              decimal={decimal}
                                              colDataArray={colDataArray}
                                              labelDataArray={labelDataArray}
                                              headerDataArray={headerDataArray}
                                              excludedArray={excludedArray}
                                              setExcludedArray={setExcludedArray}
              />
          )
        }
        {
            !hideDB_ID_Tile && toggleIDView
            && <Show decimal={decimal}
                     value={headerLabel}
                     colDataArray={colDataArray}
                     labelDataArray={labelDataArray}
                     headerDataArray={headerDataArray}
                     excludedArray={excludedArray}
                     setExcludedArray={setExcludedArray}
            />
        }
      </>
  );
}

export default DisplaySingleOutput;