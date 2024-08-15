import Show from "@/components/output/section/show/show";
import { headerLabel } from "@/constants/constants";

function DisplaySingleOutput({
                               excelFile,
                               colDataArray,
                               labelDataArray,
                               decimal,
                               setDecimal,
                               toggleIDView,
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
                                              colDataArray={colDataArray}
                                              labelDataArray={labelDataArray}
                                              headerDataArray={headerDataArray}
                                              excludedArray={excludedArray}
                                              setExcludedArray={setExcludedArray}
                                              decimal={decimal}
                                              setDecimal={setDecimal}
              />
          )
        }
        {
            toggleIDView && <Show value={headerLabel}
                                  colDataArray={colDataArray}
                                  labelDataArray={labelDataArray}
                                  headerDataArray={headerDataArray}
                                  excludedArray={excludedArray}
                                  setExcludedArray={setExcludedArray}
                                  decimal={decimal}
                                  setDecimal={setDecimal}
            />
        }
      </>
  );
}

export default DisplaySingleOutput;