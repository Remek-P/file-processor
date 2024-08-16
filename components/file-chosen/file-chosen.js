import { useState } from "react";

import DisplayOutput from "@/components/output/displayOutput/displayOutput";
import ActionsMenu from "@/components/file-chosen/actions-menu/actions-menu";
import ExcludedData from "@/components/output/excluded-data/excluded-data";

import { idLabel } from "@/constants/constants";

import classes from "./file-chosen.module.scss";


function FileChosen({
                      handleFileChange,
                      excelFile,
                      refreshData,
                      isFetched,
                    }) {

  const [numberOfOutputs, setNumberOfOutputs] = useState([{delete: false}]);
  const [decimal, setDecimal] = useState(undefined);
  const [excludedArray, setExcludedArray] = useState([]);
  const [toggleIDView, setToggleIDView] = useState(true)

  // if the provided data (excelFile) does not contain id or assigned id by DB, which is specified in constants.js, then return -1, and user can select id
  const indexOfID = excelFile[1].findIndex(element =>
      element?.toLowerCase() === "id" || element.toLowerCase() === idLabel);
  const [IDIndex, setIDIndex] = useState(indexOfID);
  
  const addPerson = () => {
    setNumberOfOutputs(prevState => [...prevState, {delete: false}])
  }

  const deleteAll = () => {
    setNumberOfOutputs([]);
    setExcludedArray([]);
  }

  const handleDecimalChange = (event, { value, direction }) => {
    if (direction === "down" && value >= 0) {
      setDecimal(value);
    }
    if (direction === "up") {
      setDecimal(value);
    }
    if (!direction && value >= 0) {
      setDecimal(value);
    }
  }

  const handleShowAllHiddenArrays = () => {
    setExcludedArray([]);
  }
  const handleHideAllArrays = () => {
    setExcludedArray([...(new Set(excelFile[0]))]);
  }
  

  return (
      <section className={classes.sectionContainer}>

        <ActionsMenu decimal={decimal}
                     isFetched={isFetched}
                     setIDIndex={setIDIndex}
                     refreshData={refreshData}
                     toggleIDView={toggleIDView}
                     setToggleIDView={setToggleIDView}
                     handleFileChange={handleFileChange}
                     addPerson={addPerson}
                     deleteAll={deleteAll}
                     handleHideAllArrays={handleHideAllArrays}
                     handleDecimalChange={handleDecimalChange}
                     handleShowAllHiddenArrays={handleShowAllHiddenArrays}
        />

        <div className={classes.outputsContainer}>
          <DisplayOutput excelFile={excelFile}
                         IDIndex={IDIndex}
                         setIDIndex={setIDIndex}
                         decimal={decimal}
                         setDecimal={setDecimal}
                         toggleIDView={toggleIDView}
                         numberOfOutputs={numberOfOutputs}
                         excludedArray={excludedArray}
                         setExcludedArray={setExcludedArray}
                         setNumberOfOutputs={setNumberOfOutputs}
          />
        </div>

        <ul className={classes.hiddenContainer}>
          <ExcludedData excludedArray={excludedArray}
                        setExcludedArray={setExcludedArray} />
        </ul>

      </section>
  );
}

export default FileChosen;