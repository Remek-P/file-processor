import Show from "@/components/output/section/show/show";
import {useState} from "react";


function DisplaySingleOutput({ excelFile, colDataArray, labelDataArray, decimal }) {

  const [excludedArray, setExcludedArray] = useState([]);

  const excelFileUniqueValues = [... new Set(excelFile[0])];

  const headerDataArray = excelFile[0];

  const isContainingItemFromArray = (item, arr) => {
    return arr.includes(item)
  }

  return (
      <>
        {
          excelFileUniqueValues.map((value, index) => {
            if (isContainingItemFromArray(value, excludedArray)) {
              return null
            } else {
              return <Show key={value}
                           index={index}
                           value={value}
                           colDataArray={colDataArray}
                           labelDataArray={labelDataArray}
                           headerDataArray={headerDataArray}
                           excludedArray={excludedArray}
                           setExcludedArray={setExcludedArray}
                           decimal={decimal}
              />
            }
          })
        }
      </>
  );
}

export default DisplaySingleOutput;