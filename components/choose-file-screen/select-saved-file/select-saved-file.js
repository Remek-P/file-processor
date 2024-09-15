import {useContext, useEffect, useState} from "react";

import { Button, Select, SelectItem, Tile } from "@carbon/react";
import { Run } from "@carbon/icons-react";

import {FileDataGlobalContext} from "@/context/global-context";
import {getFileNames} from "@/utils/create-indexedDB";

import classes from "@/components/choose-file-screen/choose-file.module.scss";

function SelectSavedFile({isUpdate, loadSavedFile}) {

  const [selectedOption, setSelectedOption] = useState('');
  const [savedFilesNames, setSavedFilesNames] = useState([]);

  const handleSelect = (event) => {
    setSelectedOption(event.target.value);
  };

  const { addWarnings } = useContext(FileDataGlobalContext);

  useEffect(() => {
    const getSavedFilesNames = async () => {
      try {
        const res = await getFileNames();
        setSavedFilesNames(res);
      } catch (error) {
        addWarnings("Error fetching file names");
      } finally {
      }
    };

    getSavedFilesNames();
  }, [isUpdate]);

  const handleClick = () => {
    loadSavedFile(selectedOption);
  }

  return (
      <Tile className={classes.tile}>
        <h6>Select a saved file:</h6>
        <Select id="selectSavedFile"
                labelText="Select a saved file:"
                hideLabel={true}
                value={selectedOption}
                onChange={handleSelect}
                size="sm">
          <SelectItem value=""  text="Please choose file to load" />
          {savedFilesNames.map((fileName, index) => (
              <SelectItem key={index} value={fileName} text={fileName} />
        ))}
        </Select>

        <Button onClick={handleClick} size="md">
          <Run/>
          <span>Load saved file</span>
        </Button>

      </Tile>
  );
}

export default SelectSavedFile;