import {useRef, useState} from "react";

import DisplayOutput from "@/components/choose-file-screen/displayOutput/displayOutput";
import ActionsMenu from "@/components/actions-menu/actions-menu";

import classes from "./file-chosen.module.scss";
import {Tile} from "@carbon/react";

function FileChosen({
                      handleFileChange,
                      excelFile,
                    }) {

  const [numberOfOutputs, setNumberOfOutputs] = useState([{delete: false}]);
  const [decimal, setDecimal] = useState(undefined);
  const [excludedArray, setExcludedArray] = useState([]);

  const excludedValueRef = useRef(null);

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

  const removeFromExcludedArray = (excludedValueRef) => {
    setExcludedArray(prevState => prevState.filter(value => value !== excludedValueRef.target.textContent))
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
          {
            excludedArray.map((value, index) => {
              return (
                  <Tile key={index} onClick={removeFromExcludedArray.bind(excludedValueRef)} ref={excludedValueRef}>
                    <span>{value}</span>
                  </Tile>
              )
            })
          }

        </div>

      </section>
  );
}

export default FileChosen;