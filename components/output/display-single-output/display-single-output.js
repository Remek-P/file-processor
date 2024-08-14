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
        {excelFileUniqueValues[0] === "MongoDB ID"
            && <Show value="MongoDB ID"
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