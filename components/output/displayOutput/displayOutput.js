import Output from "@/components/output/output";

import classes from "@/components/file-chosen/file-chosen.module.scss";

function DisplayOutput({
                         numberOfOutputs,
                         setNumberOfOutputs,
                         excelFile,
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
                            excelFile={excelFile}
                            index={index}
                            handleDeleteChecked={handleDeleteChecked}
                            decimal={decimal}
                            setDecimal={setDecimal}
                            excludedArray={excludedArray}
                            setExcludedArray={setExcludedArray}
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