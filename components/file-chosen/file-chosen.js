import { useState } from "react";

import DisplayOutput from "@/components/output/displayOutput/displayOutput";
import ActionsMenu from "@/components/file-chosen/actions-menu/actions-menu";
import ExcludedData from "@/components/output/excluded-data/excluded-data";

import { idLabel } from "@/constants/constants";

import classes from "./file-chosen.module.scss";
import IdNotAvailable from "@/components/output/id-not-available/id-not-available";


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
  const labelArray = excelFile[1];

  const indexOfID = labelArray.findIndex(element =>
      element?.toLowerCase() === "id" || element.toLowerCase() === idLabel);
  const [IDIndex, setIDIndex] = useState(indexOfID);

  // If all objects are to delete
  const checkIfOutputsToDelete = numberOfOutputs.every(output => output.delete === true);

  // checkIfOutputsToDelete === true - hide the hidden array (there are no outputs shown)
  const hideHiddenArraysWhenNoUser = checkIfOutputsToDelete
      ? "hiddenContainerHide" : "hiddenContainerShow";

  // TODO: hide hidden arrays when no input or no user
  // hide db id tile constant, when no db id in the labels array
  const hideDB_ID_Tile = labelArray.findIndex(element => element.toLowerCase() === idLabel) === -1;
  
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

  // TODO: even thought there is no displayed output, you can hide and reveal all the hidden tiles

  const handleIDPick = (e) => {
    setIDIndex(e.target.dataset.value);
  }

  if (IDIndex === -1) return <IdNotAvailable labels={labelArray}
                                             handleIDPick={handleIDPick} />

  return (
      <section className={classes.sectionContainer}>

        <ActionsMenu decimal={decimal}
                     isFetched={isFetched}
                     setIDIndex={setIDIndex}
                     refreshData={refreshData}
                     toggleIDView={toggleIDView}
                     setToggleIDView={setToggleIDView}
                     handleFileChange={handleFileChange}
                     hideDB_ID_Tile={hideDB_ID_Tile}
                     addPerson={addPerson}
                     deleteAll={deleteAll}
                     handleHideAllArrays={handleHideAllArrays}
                     handleDecimalChange={handleDecimalChange}
                     handleShowAllHiddenArrays={handleShowAllHiddenArrays}
        />

        <div className={classes.outputsContainer}>
          <DisplayOutput excelFile={excelFile}
                         IDIndex={IDIndex}
                         decimal={decimal}
                         setDecimal={setDecimal}
                         hideDB_ID_Tile={hideDB_ID_Tile}
                         toggleIDView={toggleIDView}
                         numberOfOutputs={numberOfOutputs}
                         excludedArray={excludedArray}
                         setExcludedArray={setExcludedArray}
                         setNumberOfOutputs={setNumberOfOutputs}
          />
        </div>

        <ul className={`${classes[hideHiddenArraysWhenNoUser]}`}>
          <ExcludedData excludedArray={excludedArray}
                        setExcludedArray={setExcludedArray} />
        </ul>

      </section>
  );
}

export default FileChosen;