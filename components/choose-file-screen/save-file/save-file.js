import {useContext, useEffect, useState} from "react";

import { addData } from "@/utils/create-indexedDB";
import { FileDataGlobalContext } from "@/context/global-context";

import {Button, TextInput, Tile} from "@carbon/react";
import { Save } from "@carbon/icons-react";

import classes from "@/components/choose-file-screen/choose-file.module.scss";

function SaveFile({ setIsUpdate}) {

  const { file, fileName, addWarnings, setLoading } = useContext(FileDataGlobalContext);

  const [assignedFileName, setAssignedFileName] = useState("");
  const [isDisabled, setIsDisabled] = useState(false)

  const labelText = "Save the file";

  useEffect(() => {
    if (fileName !== null && fileName !== "") setAssignedFileName(fileName);
  }, [fileName]);

  useEffect(() => {
    if (assignedFileName.trim() === "") setIsDisabled(true);
    else setIsDisabled(false);
  }, [assignedFileName]);

  const handleChange = (e) => {
    setAssignedFileName(e.target.value);
  }

  const handleSave = async () => {
    setLoading(true);
    try {
      await addData(assignedFileName, file);
    } catch (error) {
      addWarnings("Error saving file");
    } finally {
      setLoading(false);
      setAssignedFileName("");
      setIsUpdate(prevState => !prevState);
      setIsDisabled(true);
    }
  };

  return (
      <Tile className={`${classes.tile} ${classes.optionContainerSpacing}`}>

        <h6>Save file</h6>
        <TextInput id="saveFile"
                   labelText={labelText}
                   value={assignedFileName}
                   onChange={handleChange}
                   placeholder="Enter file name to save"
                   hideLabel={true}
                   size="sm"
                   className={classes.optionContainerSelect}
        />

        <Button size="md" onClick={handleSave} disabled={isDisabled}>
          <Save />
          <span>Save</span>
        </Button>
      </Tile>
  );
}

export default SaveFile;