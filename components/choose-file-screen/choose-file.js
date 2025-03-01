import { useState } from "react";

import FetchOption from "@/components/choose-file-screen/fetch-option/fetch-option";
import UploadFileOption from "@/components/choose-file-screen/upload-file-option/upload-file-option";
import SaveFile from "@/components/choose-file-screen/save-file/save-file";
import SelectSavedFile from "@/components/choose-file-screen/select-saved-file/select-saved-file";

import classes from "./choose-file.module.scss";
import SearchDbDirectly from "@/components/choose-file-screen/search-DB-directly/search-db-directly";
import SearchDatabaseInput from "@/components/choose-file-screen/search-database-input/search-database-input";
import UploadToIndexedDB
  from "@/components/choose-file-screen/upload-file-option/upload-to-IndexedDB/upload-to-IndexedDB";
import UploadToDB from "@/components/choose-file-screen/upload-file-option/upload-file-to-db/upload-file-to-db";
import useIndexedDBSize from "@/hooks/useIndexedDBSize";
import BackButton from "@/components/navigation/back-button/back-button";

function ChooseFile({
                      handleFile,
                      fetchDataFromDB,
                      loadSavedFile,
                      fetchDirectlyDataFromDB,
                      goBackButton
                    }) {

  const [ isUpdate, setIsUpdate ] = useState(false);
  const [ isFileDelivered, setIsFileDelivered ] = useState(false);
  const [ isSearchDatabase, setIsSearchDatabase ] = useState(false);
  const [ isToBeUploaded, setIsToBeUploaded ] = useState(false);

  useIndexedDBSize() //Check if the IndexedDb size is significant

  const handleBackButtonUpload = () => {
    setIsToBeUploaded(false)
  }

  const handleBackButtonDownload = () => {
    setIsFileDelivered(false)
    goBackButton()
  }

  return (
      <section className={ classes.chooseFileContainer }>

        {
            !isFileDelivered && !isSearchDatabase && !isToBeUploaded &&
            <>
              <div className={ `${ classes.optionContainer } shadow` }>
                <FetchOption fetchDataFromDB={ fetchDataFromDB }
                             setIsFileDelivered={ setIsFileDelivered }
                />
              </div>

              <div className={ `${ classes.optionContainer } shadow` }>
                <UploadFileOption setIsToBeUploaded={ setIsToBeUploaded } />
              </div>

              <div className={ `${ classes.optionContainer } shadow` }>
                <SelectSavedFile isUpdate={ isUpdate }
                                 loadSavedFile={ loadSavedFile }
                />
              </div>

              <div className={ `${ classes.optionContainer } shadow` }>
                <SearchDbDirectly setIsSearchDatabase={ setIsSearchDatabase } />
              </div>
            </>
        }

        {
            isFileDelivered &&
            <div className={ classes.chooseFileContainerSub }>
              <BackButton click={ handleBackButtonDownload }/>

              <SaveFile setIsUpdate={ setIsUpdate }/>

              <SelectSavedFile isUpdate={ isUpdate } loadSavedFile={ loadSavedFile }
              />

            </div>
        }

        {
            isSearchDatabase &&
            <div className={ `${ classes.optionContainer } shadow` }>
              <SearchDatabaseInput fetchDirectlyDataFromDB={ fetchDirectlyDataFromDB } />
            </div>
        }

        {
            isToBeUploaded && !isFileDelivered &&
            <div className={ classes.chooseFileContainerSub }>

              <BackButton click={ handleBackButtonUpload }/>

              <UploadToIndexedDB handleFile={ handleFile } setIsFileDelivered={ setIsFileDelivered }/>

              <UploadToDB setIsFileDelivered={ setIsFileDelivered }/>

            </div>
        }

      </section>
  );
}

export default ChooseFile;