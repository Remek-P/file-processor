import { useState } from "react";

import DisplayOutput from "@/components/choose-file-screen/displayOutput/displayOutput";
import ActionsMenu from "@/components/actions-menu/actions-menu";

import classes from "./file-chosen.module.scss";

function FileChosen({
                      handleFileChange,
                      excelFile,
                    }) {

  const [numberOfOutputs, setNumberOfOutputs] = useState([{delete: false}]);
  const [decimal, setDecimal] = useState(2);

  const addPerson = () => {
    setNumberOfOutputs(prevState => [...prevState, {delete: false}])
  }

  const deleteAll = () => {
    setNumberOfOutputs([])
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
          />

        </div>

      </section>
  );
}

export default FileChosen;