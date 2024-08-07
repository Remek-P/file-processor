import {useRef, useState} from "react";

import Show from "@/components/output/section/show/show";

import {Tile} from "@carbon/react";


function DisplaySingleOutput({
                               excelFile,
                               colDataArray,
                               labelDataArray,
                               decimal,
                               setDecimal
                             }) {

  const [excludedArray, setExcludedArray] = useState([]);

  const excludedValueRef = useRef(null);

  const excelFileUniqueValues = [... new Set(excelFile[0])];

  const headerDataArray = excelFile[0];

  const isContainingItemFromArray = (item, arr) => {
    return arr.includes(item)
  }
  
  const removeFromExcludedArray = (excludedValueRef) => {
    setExcludedArray(prevState => prevState.filter(value => value !== excludedValueRef.target.textContent))
  }

  return (
      <>
        {
          excelFileUniqueValues.map((value, index) => {
            if (!isContainingItemFromArray(value, excludedArray)) {
              return <Show key={value}
                           index={index}
                           value={value}
                           colDataArray={colDataArray}
                           labelDataArray={labelDataArray}
                           headerDataArray={headerDataArray}
                           excludedArray={excludedArray}
                           setExcludedArray={setExcludedArray}
                           decimal={decimal}
                           setDecimal={setDecimal}
              />
            }
          })
        }
        <div>
          {
            excludedArray.map((value, i) => {
              return (
                  <Tile key={i} onClick={removeFromExcludedArray.bind(excludedValueRef)}>
                    <span ref={excludedValueRef}>{value}</span>
                  </Tile>
              )
            })
          }

        </div>
      </>
  );
}

export default DisplaySingleOutput;