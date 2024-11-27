import { useContext, useState } from "react";

import {
  DecimalDataProvider,
  ExcludedDataProvider, IsContainingSubheadersContext,
  SearchSuggestionsOrderGlobalProvider,
  ShowAllMetricsProvider
} from "@/context/global-context";

import DisplayOutput from "@/components/output/displayOutput/displayOutput";
import ActionsMenu from "@/components/file-chosen/actions-menu/actions-menu";
import IdNotAvailable from "@/components/output/id-not-available/id-not-available";

import ExcludedData from "@/components/output/excluded-data/excluded-data";

import { isContainingSubheaders } from "@/utils/parserUtils";

import { ID_LABEL } from "@/constants/constants";

import classes from "./file-chosen.module.scss";


function FileChosen({
                      file,
                      refreshData,
                      handleFileChange,
                    }) {

  const { isSubheaders } = useContext(IsContainingSubheadersContext);

  const [numberOfOutputs, setNumberOfOutputs] = useState([{delete: false}]);

  // const isSubheaders = useMemo(() =>
  //     isContainingSubheaders(file), [file]);

  const labelArray = isSubheaders === true ? file[1] : file[0];

  // if the provided data (file) does not contain id or assigned id by DB, which is specified in constants.js, then return -1, and user can select id
  const indexOfID = labelArray.findIndex(element =>
      element?.toLowerCase() === "id" || element.toLowerCase() === ID_LABEL);
  const [IDIndex, setIDIndex] = useState(indexOfID);

  // If all objects are to delete
  const checkIfOutputsToDelete = numberOfOutputs.every(output => output.delete === true);

  // checkIfOutputsToDelete === true - hide the hidden array (there are no outputs shown)
  const hideHiddenArraysWhenNoUser = checkIfOutputsToDelete
      ? "hiddenContainerHide" : "hiddenContainerShow";

  // TODO: hide hidden arrays when no input or no user
  // hide db id tile constant, when no db id in the labels array
  const hideDB_ID_Tile = labelArray.findIndex(element => element.toLowerCase() === ID_LABEL) === -1;

  const addPerson = () => {
    setNumberOfOutputs(prevState => [...prevState, {delete: false}]);
  }

  // TODO: even thought there is no displayed output, you can hide and reveal all the hidden tiles

  const handleIDPick = (e) => {
    setIDIndex(e.target.dataset.value);
  }

  const handleResetID = () => {
    setIDIndex(-1);
  }

  if (IDIndex === -1) return <IdNotAvailable labels={labelArray}
                                             handleIDPick={handleIDPick}/>

  return (
      <DecimalDataProvider>
        <ExcludedDataProvider>
          <ShowAllMetricsProvider>
            <SearchSuggestionsOrderGlobalProvider>

            <section className={classes.sectionContainer}>

              <ActionsMenu headers={file[0]}
                           refreshData={refreshData}
                           isSubheaders={isSubheaders}
                           hideDB_ID_Tile={hideDB_ID_Tile}
                           setNumberOfOutputs={setNumberOfOutputs}
                           addPerson={addPerson}
                           handleResetID={handleResetID}
                           handleFileChange={handleFileChange}
              />


              <div className={classes.outputsContainer}>
                <DisplayOutput IDIndex={IDIndex}
                               isSubheaders={isSubheaders}
                               hideDB_ID_Tile={hideDB_ID_Tile}
                               numberOfOutputs={numberOfOutputs}
                               setNumberOfOutputs={setNumberOfOutputs}
                />
              </div>

              <ul className={`${classes[hideHiddenArraysWhenNoUser]}`}>
                <ExcludedData />
              </ul>

            </section>

            </SearchSuggestionsOrderGlobalProvider>
          </ShowAllMetricsProvider>
        </ExcludedDataProvider>
      </DecimalDataProvider>
  );
}

export default FileChosen;