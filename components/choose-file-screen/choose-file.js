import { useState } from "react";

import FetchOption from "@/components/choose-file-screen/fetch-option/fetch-option";
import UploadFileOption from "@/components/choose-file-screen/upload-file-option/upload-file-option";
import SaveFile from "@/components/choose-file-screen/save-file/save-file";
import SelectSavedFile from "@/components/choose-file-screen/select-saved-file/select-saved-file";

import classes from "./choose-file.module.scss";
import SearchDbDirectly from "@/components/choose-file-screen/search-DB-directly/search-db-directly";
import SearchDatabaseInput from "@/components/choose-file-screen/search-database-input/search-database-input";

function ChooseFile({
                      handleFile,
                      fetchDataFromDB,
                      loadSavedFile
                    }) {

  const [isUpdate, setIsUpdate] = useState(false);
  const [isFileDelivered, setIsFileDelivered] = useState(false);
  const [isSearchDatabase, setIsSearchDatabased] = useState(false);

  return (
      <section className={classes.chooseFileContainer}>

        {
            !isFileDelivered && !isSearchDatabase &&
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

              <div className={`${classes.optionContainer} shadow`}>
                <SearchDbDirectly setIsSearchDatabased={setIsSearchDatabased} />
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

        {
            isSearchDatabase &&
              <div className={`${classes.optionContainer} shadow`}>
                <SearchDatabaseInput />
              </div>
        }

      </section>
  );
}

export default ChooseFile;