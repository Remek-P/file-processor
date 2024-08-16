import Output from "@/components/output/output";

import classes from "@/components/file-chosen/file-chosen.module.scss";

function DisplayOutput({
                         decimal,
                         IDIndex,
                         setIDIndex,
                         excelFile,
                         toggleIDView,
                         hideDB_ID_Tile,
                         numberOfOutputs,
                         setNumberOfOutputs,
                         excludedArray,
                         setExcludedArray
                       }) {

  const handleDeleteChecked = (e) => {
    if (e.target.checked) {
      setNumberOfOutputs(numberOfOutputs.map((output, index) => {
            if (index === +e.target.value) {
              return { delete: true };
            } else {
              return output;
            }
          })
      )
    }
  }

  // TODO: stop the outputs array from growing infinitely
  const indexOfFirstElToKeep = numberOfOutputs.indexOf(el => el.delete === false);

  const b = numberOfOutputs.map(element => element.delete === false ? 1 : 0).reduce((acc, curr) => acc + curr, 0);

  console.log("numberOfOutputs", numberOfOutputs)
  console.log("b", b)

  if (numberOfOutputs.length > 1) {
    if (b === 1) {
      setNumberOfOutputs([{delete: false}]);
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
                            decimal={decimal}
                            IDIndex={IDIndex}
                            setIDIndex={setIDIndex}
                            excelFile={excelFile}
                            toggleIDView={toggleIDView}
                            excludedArray={excludedArray}
                            setExcludedArray={setExcludedArray}
                            hideDB_ID_Tile={hideDB_ID_Tile}
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