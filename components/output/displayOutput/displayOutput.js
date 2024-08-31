import Output from "@/components/output/output";

import classes from "@/components/file-chosen/file-chosen.module.scss";

function DisplayOutput({
                         decimal,
                         IDIndex,
                         excelFile,
                         toggleIDView,
                         hideDB_ID_Tile,
                         numberOfOutputs,
                         setNumberOfOutputs,
                         excludedArray,
                         setExcludedArray,
                         searchSuggestionsOrder,
                         setSearchSuggestionsOrder,
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
      // const indexToDelete = +(e.target.value);
      // const newOutputs = numberOfOutputs.filter((output) => output !== numberOfOutputs[indexToDelete]);
      // setNumberOfOutputs(newOutputs);
    }
  }

  // TODO: stop the outputs array from growing infinitely

  // const checkHowManyOutputsToKeep = numberOfOutputs.map(element => element.delete === false ? 1 : 0).reduce((acc, curr) => acc + curr, 0);
  //TODO: While deleting first output out of two, everything is being reset

  // if (checkHowManyOutputsToKeep === 1 && numberOfOutputs.length > 1) {
  //   const indexToKeep = numberOfOutputs.findIndex(output => output.delete === false);
  //   console.log("numberOfOutputs", numberOfOutputs[indexToKeep])
  //   setNumberOfOutputs([numberOfOutputs[indexToKeep]]);
  // }


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
                            excelFile={excelFile}
                            toggleIDView={toggleIDView}
                            excludedArray={excludedArray}
                            setExcludedArray={setExcludedArray}
                            hideDB_ID_Tile={hideDB_ID_Tile}
                            searchSuggestionsOrder={searchSuggestionsOrder}
                            setSearchSuggestionsOrder={setSearchSuggestionsOrder}
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