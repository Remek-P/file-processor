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

  const excelFileUniqueValues = [... new Set(excelFile[0])];

  const headerDataArray = excelFile[0];

  console.log("toggleIDView", toggleIDView)

  // TODO: hide mongoDb index if other available

  return (
      <>
        {
          excelFileUniqueValues.map(value => {

            if (value === "MongoDB ID") return null;

            return <Show key={value}
                         value={value}
                         colDataArray={colDataArray}
                         labelDataArray={labelDataArray}
                         headerDataArray={headerDataArray}
                         excludedArray={excludedArray}
                         setExcludedArray={setExcludedArray}
                         decimal={decimal}
                         setDecimal={setDecimal}
            />
          })
        }
        {excelFileUniqueValues[0] === headerLabel
            && toggleIDView
            && <Show value={headerLabel}
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