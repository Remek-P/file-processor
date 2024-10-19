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
  const [isFileDelivered, setIsFileDelivered] = useState(false);

  // TODO: fails when default name - no update?

  return (
      <section className={classes.chooseFileContainer}>

        {
            !isFileDelivered &&
            <>
              <div className={`${classes.optionContainer} shadow`}>
                <FetchOption fetchDataFromDB={fetchDataFromDB}
                             setIsFileDelivered={setIsFileDelivered}
                />
              </div>

              <div className={`${classes.optionContainer} shadow`}>
                <UploadFileOption handleFile={handleFile}
                                  setIsFileDelivered={setIsFileDelivered}
                />
              </div>

              <div className={`${classes.optionContainer} shadow`}>
                <SelectSavedFile isUpdate={isUpdate}
                                 loadSavedFile={loadSavedFile}
                />
              </div>
            </>
        }
        {
            isFileDelivered &&
            <>
              <div className={`${classes.optionContainer} shadow`}>
                <SaveFile setIsUpdate={setIsUpdate}/>
              </div>

              <div className={`${classes.optionContainer} shadow`}>
                <SelectSavedFile isUpdate={isUpdate}
                                 loadSavedFile={loadSavedFile}
                />
              </div>
            </>
        }

      </section>
  );
}

export default ChooseFile;