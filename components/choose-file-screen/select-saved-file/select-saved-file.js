import {useContext, useEffect, useState} from "react";

import { Button, Select, SelectItem, Tile } from "@carbon/react";
import { Run } from "@carbon/icons-react";

import {FileDataGlobalContext} from "@/context/global-context";
import {getFileNames} from "@/utils/create-indexedDB";

import classes from "@/components/choose-file-screen/choose-file.module.scss";

function SelectSavedFile({isUpdate, loadSavedFile}) {

  const [selectedOption, setSelectedOption] = useState('');
  const [savedFilesNames, setSavedFilesNames] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true)

  const handleSelect = (event) => {
    const value = event.target.value;
    if (value !== "")setIsDisabled(false);
    else setIsDisabled(true);
    setSelectedOption(value);
  };

  const { addWarnings } = useContext(FileDataGlobalContext);

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

  const handleClick = () => {
    loadSavedFile(selectedOption);
  }

  return (
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
              <SelectItem key={index} value={fileName} text={fileName} />
        ))}
        </Select>

        <Button onClick={handleClick} size="md" disabled={isDisabled}>
          <Run />
          <span>Load</span>
        </Button>
      </Tile>
  );
}

export default SelectSavedFile;