import {useContext, useEffect, useState} from "react";

import { addData } from "@/utils/create-indexedDB";
import { FileDataGlobalContext } from "@/context/global-context";

import {Button, TextInput, Tile} from "@carbon/react";
import { Save } from "@carbon/icons-react";

import classes from "@/components/choose-file-screen/choose-file.module.scss";

function SaveFile({ setIsUpdate}) {

  const { file, fileName, addWarnings, setLoading } = useContext(FileDataGlobalContext);

  const [assignedFileName, setAssignedFileName] = useState("");

  const labelText = "Save the file";

  useEffect(() => {
    if (fileName !== null && fileName !== "") setAssignedFileName(fileName);
  }, [fileName]);

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
    }
  };


  return (
      <Tile className={`${classes.tile} ${classes.optionContainerSpacing}`}>

        <h6>Save file</h6>
        <TextInput id="saveFile"
                   labelText={labelText}
                   value={assignedFileName}
                   onChange={(e) => setAssignedFileName(e.target.value)}
                   placeholder="Enter file name to save"
                   hideLabel={true}
                   size="sm"
                   className={classes.optionContainerSelect}
        />

        <Button size="md" onClick={handleSave}>
          <Save />
          <span>Save</span>
        </Button>
      </Tile>
  );
}

export default SaveFile;