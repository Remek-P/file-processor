import { useState } from "react";

import FetchOption from "@/components/choose-file-screen/fetch-option/fetch-option";

import UploadFileOption from "@/components/choose-file-screen/upload-file-option/upload-file-option";
import classes from "@/components/choose-file-screen/choose-file.module.scss";

function ChooseFileAlt({
                      file,
                      handleFile,
                      fetchDataFromDB,
                      loadSavedFile,
                      saveFile,
                      savedFiles,
                    }) {
  const [fileName, setFileName] = useState("");

  const handleSave = () => {
    saveFile(fileName, file);
  };

  return (
      <section className={classes.chooseFileContainer}>

        <div className={`${classes.optionContainer} shadow`}>
          <FetchOption fetchDataFromDB={fetchDataFromDB}/>
        </div>

        <div className={`${classes.optionContainer} shadow`}>
          <UploadFileOption handleFile={handleFile}/>
        </div>

        <div className={`${classes.optionContainer} shadow`}>
          <input type="text" value={fileName} onChange={(e) => setFileName(e.target.value)}
                 placeholder="Enter file name to save"/>
          <button onClick={handleSave}>Save File</button>
        </div>
        <div className={`${classes.optionContainer} shadow`}>
          <label>Select a saved file:</label>
          <select onChange={(e) => loadSavedFile(e.target.value)}>
            <option value="">Select...</option>
            {savedFiles.map((file, index) => (
                <option key={index} value={file.name}>
                  {file.name}
                </option>
            ))}
          </select>
        </div>


      </section>
  );
}

export default ChooseFileAlt;