import Show from "@/components/output/section/show/show";

function DisplaySingleOutput({
                               excelFile,
                               colDataArray,
                               labelDataArray,
                               decimal,
                               setDecimal,
                               excludedArray,
                               setExcludedArray
                             }) {

  const excelFileUniqueValues = [... new Set(excelFile[0])];

  const headerDataArray = excelFile[0];

  return (
      <>
        {
          excelFileUniqueValues.map((value, index) => {
            // if (!isContainingItemFromArray(value, excludedArray)) {
            //   return <Show key={value}
            //                index={index}
            //                value={value}
            //                colDataArray={colDataArray}
            //                labelDataArray={labelDataArray}
            //                headerDataArray={headerDataArray}
            //                excludedArray={excludedArray}
            //                setExcludedArray={setExcludedArray}
            //                decimal={decimal}
            //                setDecimal={setDecimal}
            //   />
            // }
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
      </>
  );
}

export default DisplaySingleOutput;