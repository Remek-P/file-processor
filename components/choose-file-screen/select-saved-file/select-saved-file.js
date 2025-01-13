import {useContext, useEffect, useState} from "react";

import {Button, IconButton, Select, SelectItem, Tile} from "@carbon/react";
import {Run, TrashCan} from "@carbon/icons-react";

import { FileDataGlobalContext } from "@/context/global-context";
import { getFileNames } from "@/utils/indexedDB";

import classes from "@/components/choose-file-screen/choose-file.module.scss";
import Link from "next/link";
import IndexedDBSizeMonit from "@/components/notifications/IndexedDB-size-monit/IndexedDB-size-monit";
import useSizeNotification from "@/hooks/useSizeNotification";
import useRejectSizeNotification from "@/hooks/useRejectSizeNotification";
import useIndexedDBSize from "@/hooks/useIndexedDBSize";

function SelectSavedFile({ isUpdate, loadSavedFile }) {

  const { addWarnings } = useContext(FileDataGlobalContext);

  const [ selectedOption, setSelectedOption ] = useState('');
  const [ savedFilesNames, setSavedFilesNames ] = useState([]);
  const [ isDisabled, setIsDisabled ] = useState(true);
  const [ showNotifications, setShowNotifications ] = useState(false);

  const { handleSizeNotification } = useSizeNotification();

  useIndexedDBSize(); //Check if the IndexedDb size is significant

  const handleSelect = (event) => {
    const value = event.target.value;
    if (value !== "")setIsDisabled(false);
    else setIsDisabled(true);
    setSelectedOption(value);
  };

  useEffect(() => {
    const getSavedFilesNames = async () => {
      try {
        const res = await getFileNames();
        setSavedFilesNames(res);
      } catch (error) {
        addWarnings("Error fetching file names");
      }
    };

    getSavedFilesNames();
  }, [isUpdate]);

  const showNotification = () => {
    setShowNotifications(true)
  }

  const handleLoadSavedFile = () => {
    loadSavedFile(selectedOption)
  }

  const handleClick = () => {
    handleSizeNotification(showNotification, handleLoadSavedFile);
  }

  const handleReject = useRejectSizeNotification(setShowNotifications, handleLoadSavedFile);

  return (
      <>
        <Tile className={`${classes.tile} ${classes.optionContainerSpacing}`}>

          <h6>Select a saved file:</h6>
          <Select id="selectSavedFile"
                  labelText="Select the saved file:"
                  hideLabel={true}
                  value={selectedOption}
                  onChange={handleSelect}
                  size="sm"
                  className={classes.optionContainerSelect}
          >
            <SelectItem value="" text="Choose file to load"/>
            {savedFilesNames.map((fileName, index) => (
                <SelectItem key={index}
                            value={fileName}
                            text={fileName}
                />
            ))}
          </Select>

          <div className={classes.optionButtonContainer}>
            <Button onClick={handleClick} size="md" disabled={isDisabled}>
              <Run />
              <span>Load</span>
            </Button>

            <Link href="/delete-file">
              <IconButton onClick={null}
                          size="md"
                          kind="danger"
                          label="Delete files"
                          hasIconOnly={true}
                  // className={classes.deleteButton}
              >
                <TrashCan />
              </IconButton>
            </Link>
          </div>
        </Tile>

        <IndexedDBSizeMonit handleReject={handleReject} showNotifications={showNotifications} rejectText="Load" />
      </>
  );
}

export default SelectSavedFile;