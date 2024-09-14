import {useContext, useEffect, useState} from "react";

import { addData } from "@/utils/create-indexedDB";
import { FileDataGlobalContext } from "@/context/global-context";

import {Button, Loading, TextInput, Tile} from "@carbon/react";
import { Save } from "@carbon/icons-react";

import classes from "@/components/choose-file-screen/choose-file.module.scss";

function SaveFile({ setIsUpdate}) {

  const { file, fileName, addWarnings } = useContext(FileDataGlobalContext);

  const [isLoading, setIsLoading] = useState(false);
  const [assignedFileName, setAssignedFileName] = useState("");

  const labelText = "Save File";

  useEffect(() => {
    if (fileName !== null && fileName !== "") setAssignedFileName(fileName);
  }, [fileName]);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await addData(assignedFileName, file);
    } catch (error) {
      addWarnings("Error saving file");
    } finally {
      setIsLoading(false);
      setAssignedFileName("");
      setIsUpdate(prevState => !prevState);
    }
  };


  return (

      <Tile className={classes.tile}>
        <Loading active={isLoading} className={null} description="Saving file" id="savingFile" small={false}
                 withOverlay={true}/>

        <h6 className={classes.optionContainerHeader}>Save file</h6>
        <TextInput id="saveFile"
                   labelText={labelText}
                   value={assignedFileName}
                   onChange={(e) => setAssignedFileName(e.target.value)}
                   placeholder="Enter file name to save"
                   hideLabel={true}
                   size="sm"
                   className={classes.saveFile}
        />

        <Button size="md" onClick={handleSave}>
          <Save />
          <span>{labelText}</span>
        </Button>
      </Tile>
  );
}

export default SaveFile;