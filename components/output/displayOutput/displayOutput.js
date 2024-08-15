import Output from "@/components/output/output";

import classes from "@/components/file-chosen/file-chosen.module.scss";

function DisplayOutput({
                         numberOfOutputs,
                         setNumberOfOutputs,
                         excelFile,
                         IDIndex,
                         setIDIndex,
                         decimal,
                         setDecimal,
                         excludedArray,
                         setExcludedArray
}) {

  const handleDeleteChecked = (e) => {
    if (e.target.checked) {
      setNumberOfOutputs(numberOfOutputs.map((output, index) => {
            if (index === +e.target.value) {
              return {delete: true};
            } else {
              return output;
            }
          })
      )
    }
  }


  return (
      <>
        {
          numberOfOutputs.map((output, index) => {
            if (!output.delete) {
              return (
                  <div key={index} className={classes.outputContainer}>
                    <Output key={index}
                            index={index}
                            IDIndex={IDIndex}
                            setIDIndex={setIDIndex}
                            excelFile={excelFile}
                            decimal={decimal}
                            setDecimal={setDecimal}
                            excludedArray={excludedArray}
                            setExcludedArray={setExcludedArray}
                            handleDeleteChecked={handleDeleteChecked}
                    />
                  </div>
              )
            }
          })
        }
      </>
  );
}

export default DisplayOutput;