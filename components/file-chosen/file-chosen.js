import { useContext, useState } from "react";

import {
  IsContainingSubheadersContext,
} from "@/context/global-context";

import DisplayOutput from "@/components/output/display-outputs/display-outputs";
import ActionsMenu from "@/components/file-chosen/actions-menu/actions-menu";
import IdNotAvailable from "@/components/output/id-not-available/id-not-available";
import AreYouSure from "@/components/notifications/are-you-sure/are-you-sure";
import ExcludedData from "@/components/output/excluded-data/excluded-data";

import { HEADER_LABEL, ID_LABEL } from "@/constants/constants";

import classes from "./file-chosen.module.scss";
import FileProviderWrapper from "@/components/provider-wrapper/file-provider-wrapper";

function FileChosen({
                      file,
                      userQuery,
                      refreshData,
                      isDirectFetchResults,
                      setUserQuery,
                      handleFileChange,
                      fetchDirectlyDataFromDB,
                    }) {

  const { isSubheaders, overrideSubheadersDetection } = useContext(IsContainingSubheadersContext);

  const [ isNotificationVisible, setIsNotificationVisible ] = useState(false);

  const labelArray = isSubheaders === true ? file[1] : file[0];

  // if the provided data (file) does not contain id or assigned id by DB, which is specified in constants.js, then return -1, and user can select id
  const findIDIndex = () => {
    return labelArray.findIndex(
        (label) =>
            (label?.toLowerCase() === "id" || label?.toLowerCase() === ID_LABEL)
    );
  };
  
  const [IDIndex, setIDIndex] = useState(findIDIndex());

  const DB_Label = isSubheaders ? ID_LABEL : HEADER_LABEL;
  // hide db id tile constant, when no db id in the labels array
  const hideDB_ID_Tile = labelArray.findIndex(element => element.toLowerCase() === DB_Label.toLowerCase()) === -1;

  const handleIDPick = (e) => {
    setIDIndex(Number(e.target.dataset.value));
  }

  const handleResetID = () => {
    setIDIndex(-1);
  }

  const handleSubheadersChange = () => {
    setIsNotificationVisible(true);
  }

  const handleNotification = (confirmed) => {
    if (confirmed) overrideSubheadersDetection();
    setIsNotificationVisible(false);
  };


  if (IDIndex === -1) return <IdNotAvailable labels={labelArray}
                                             handleIDPick={handleIDPick}
                              />


  return (
      <FileProviderWrapper>

        <section className={ classes.sectionContainer }>

          <ActionsMenu userQuery={ userQuery }
                       refreshData={ refreshData }
                       isSubheaders={ isSubheaders }
                       hideDB_ID_Tile={ hideDB_ID_Tile }
                       handleResetID={ handleResetID }
                       handleSubheadersChange={ handleSubheadersChange }
                       handleFileChange={ handleFileChange }
          />


          <div className={ classes.outputsContainer }>
            <DisplayOutput IDIndex={ IDIndex }
                           userQuery={ userQuery }
                           setUserQuery={ setUserQuery }
                           isSubheaders={ isSubheaders }
                           hideDB_ID_Tile={ hideDB_ID_Tile }
                           isDirectFetchResults={ isDirectFetchResults }
                           fetchDirectlyDataFromDB={ fetchDirectlyDataFromDB }
            />
          </div>

          <ExcludedData />

          { isNotificationVisible &&
              <AreYouSure handleConfirm={ () => handleNotification(true) }
                          handleReject={ () => handleNotification(false) }
              />
          }

        </section>

      </FileProviderWrapper>
  );
}

export default FileChosen;