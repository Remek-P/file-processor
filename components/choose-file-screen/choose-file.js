import { useState } from "react";

import FetchOption from "@/components/choose-file-screen/fetch-option/fetch-option";
import UploadFileOption from "@/components/choose-file-screen/upload-file-option/upload-file-option";
import SaveFile from "@/components/choose-file-screen/save-file/save-file";
import SelectSavedFile from "@/components/choose-file-screen/select-saved-file/select-saved-file";

import classes from "./choose-file.module.scss";

function ChooseFile({
                      handleFile,
                      fetchDataFromDB,
                      loadSavedFile
                    }) {

  const [isUpdate, setIsUpdate] = useState(false);

  // TODO: fails when default name - no update?

  return (
      <section className={classes.chooseFileContainer}>

        <div className={`${classes.optionContainer} shadow`}>
          <FetchOption fetchDataFromDB={fetchDataFromDB}/>
        </div>

        <div className={`${classes.optionContainer} shadow`}>
          <UploadFileOption handleFile={handleFile}/>
        </div>

        <div className={`${classes.optionContainer} shadow`}>
          <SaveFile setIsUpdate={setIsUpdate} />
        </div>

        <div className={`${classes.optionContainer} shadow`}>
          <SelectSavedFile loadSavedFile={loadSavedFile}
                           isUpdate={isUpdate}
          />
        </div>

      </section>
  );
}

export default ChooseFile;