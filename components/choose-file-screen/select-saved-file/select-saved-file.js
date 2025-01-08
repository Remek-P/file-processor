import {useContext, useEffect, useRef, useState} from "react";

import {Button, IconButton, Select, SelectItem, Tile} from "@carbon/react";
import {Run, TrashCan} from "@carbon/icons-react";

import {FileDataGlobalContext, IndexedDB_SizeContext} from "@/context/global-context";
import {checkIndexedDB_Size, getFileNames} from "@/utils/indexedDB";

import { DB_NAME } from "@/constants/constants";

import classes from "@/components/choose-file-screen/choose-file.module.scss";
import Link from "next/link";
import IndexedDBSizeMonit from "@/components/notifications/IndexedDB-size-monit/IndexedDB-size-monit";

function SelectSavedFile({ isUpdate, loadSavedFile }) {

  const [ , setTotalSize] = useContext(IndexedDB_SizeContext);
  const { addWarnings } = useContext(FileDataGlobalContext);
  const [ totalSize ] = useContext(IndexedDB_SizeContext);

  const [ selectedOption, setSelectedOption ] = useState('');
  const [ savedFilesNames, setSavedFilesNames ] = useState([]);
  const [ isDisabled, setIsDisabled ] = useState(true);
  const [ showNotifications, setShowNotifications ] = useState(false);

  const hasBeenClicked = useRef(false);

  const limitTest = totalSize > 48;

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
    checkIndexedDB_Size(DB_NAME, addWarnings, setTotalSize);
  }, [isUpdate]);

  const handleClick = () => {
    if (limitTest && !hasBeenClicked.current) {
      setShowNotifications(true);
      hasBeenClicked.current = true;
    }
    else {
      loadSavedFile(selectedOption);
    }
  }

  const handleRejectNotification = () => {
    setShowNotifications(false);
    hasBeenClicked.current = true;
  }

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
          <SelectItem value=""  text="Choose file to load" />
          {savedFilesNames.map((fileName, index) => (
              <SelectItem key={index} value={fileName} text={fileName} />))}
        </Select>

        <div className={classes.optionButtonContainer}>
          <Button onClick={handleClick} size="md" disabled={isDisabled}>
            <Run/>
            <span>Load</span>
          </Button>

          <Link href="/delete-file">
            <IconButton onClick={null}
                        size="md"
                        kind="danger"
                        label="Delete files"
                // className={classes.deleteButton}
            >
              <TrashCan/>
            </IconButton>
          </Link>
        </div>
      </Tile>
        {limitTest && showNotifications &&
            <IndexedDBSizeMonit handleReject={handleRejectNotification} />
        }
      </>
  );
}

export default SelectSavedFile;