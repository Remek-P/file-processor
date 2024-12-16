import { useContext, useState } from "react";

import {
  IsContainingSubheadersContext,
} from "@/context/global-context";

import DisplayOutput from "@/components/output/display-outputs/display-outputs";
import ActionsMenu from "@/components/file-chosen/actions-menu/actions-menu";
import IdNotAvailable from "@/components/output/id-not-available/id-not-available";
import AreYouSure from "@/components/notifications/are-you-sure/are-you-sure";
import ExcludedData from "@/components/output/excluded-data/excluded-data";

import { ID_LABEL } from "@/constants/constants";

import classes from "./file-chosen.module.scss";
import ProviderWrapper from "@/components/provider-wrapper/provider-wrapper";


function FileChosen({
                      file,
                      refreshData,
                      handleFileChange,
                    }) {

  const { isSubheaders, overrideSubheadersDetection } = useContext(IsContainingSubheadersContext);

  const [ isNotificationVisible, setIsNotificationVisible ] = useState(false);

  const labelArray = isSubheaders === true ? file[1] : file[0];

  // if the provided data (file) does not contain id or assigned id by DB, which is specified in constants.js, then return -1, and user can select id
  const indexOfID = labelArray.findIndex(element =>
      element?.toLowerCase() === "id" || element.toLowerCase() === ID_LABEL);
  const [IDIndex, setIDIndex] = useState(indexOfID);

  // TODO: hide hidden arrays when no input or no user
  // hide db id tile constant, when no db id in the labels array
  const hideDB_ID_Tile = labelArray.findIndex(element => element.toLowerCase() === ID_LABEL) === -1;

  // TODO: even thought there is no displayed output, you can hide and reveal all the hidden tiles

  const handleIDPick = (e) => {
    setIDIndex(e.target.dataset.value);
  }

  const handleResetID = () => {
    setIDIndex(-1);
  }

  const handleSubheadersChange = () => {
    setIsNotificationVisible(true);
  }

  const handleRejectNotification = () => {
    setIsNotificationVisible(false);
  }
  const handleConfirmNotification = () => {
    overrideSubheadersDetection();
    setIsNotificationVisible(false);
  }


  if (IDIndex === -1) return <IdNotAvailable labels={labelArray}
                                             handleIDPick={handleIDPick}/>

  return (
      <ProviderWrapper>

            <section className={classes.sectionContainer}>

              <ActionsMenu headers={file[0]}
                           refreshData={refreshData}
                           isSubheaders={isSubheaders}
                           hideDB_ID_Tile={hideDB_ID_Tile}
                           handleResetID={handleResetID}
                           handleSubheadersChange={handleSubheadersChange}
                           handleFileChange={handleFileChange}
              />


              <div className={classes.outputsContainer}>
                <DisplayOutput IDIndex={IDIndex}
                               isSubheaders={isSubheaders}
                               hideDB_ID_Tile={hideDB_ID_Tile}
                />
              </div>

                <ExcludedData />

              {isNotificationVisible &&
                  <AreYouSure handleConfirm={handleConfirmNotification}
                              handleReject={handleRejectNotification} />
              }

            </section>

      </ProviderWrapper>
  );
}

export default FileChosen;