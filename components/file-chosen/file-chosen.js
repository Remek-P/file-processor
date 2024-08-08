import { useState } from "react";

import DisplayOutput from "@/components/output/displayOutput/displayOutput";
import ActionsMenu from "@/components/file-chosen/actions-menu/actions-menu";

import classes from "./file-chosen.module.scss";

import ExcludedData from "@/components/output/excluded-data/excluded-data";

function FileChosen({
                      handleFileChange,
                      excelFile,
                    }) {

  const [numberOfOutputs, setNumberOfOutputs] = useState([{delete: false}]);
  const [decimal, setDecimal] = useState(undefined);
  const [excludedArray, setExcludedArray] = useState([]);


  const addPerson = () => {
    setNumberOfOutputs(prevState => [...prevState, {delete: false}])
  }

  const deleteAll = () => {
    setNumberOfOutputs([])
    setExcludedArray([])
  }

  const handleOnChange = (event, { value, direction }) => {
    if (direction === "down" && value >= 0) {
      setDecimal(value)
    }
    if (direction === "up") {
      setDecimal(value)
    }
    if (!direction && value > 0) {
      setDecimal(value)
    }
  }

  return (
      <section className={classes.sectionContainer}>

        <ActionsMenu handleOnChange={handleOnChange}
                     addPerson={addPerson}
                     deleteAll={deleteAll}
                     handleFileChange={handleFileChange}
                     decimal={decimal}
        />

        <div className={classes.outputsContainer}>
          <DisplayOutput excelFile={excelFile}
                         numberOfOutputs={numberOfOutputs}
                         setNumberOfOutputs={setNumberOfOutputs}
                         decimal={decimal}
                         setDecimal={setDecimal}
                         excludedArray={excludedArray}
                         setExcludedArray={setExcludedArray}
          />
        </div>

        <div className={classes.hiddenContainer}>
          <ExcludedData excludedArray={excludedArray} setExcludedArray={setExcludedArray} />
        </div>

      </section>
  );
}

export default FileChosen;