import classes from "./choose-file.module.scss";

import FetchOption from "@/components/choose-file-screen/fetch-option/fetch-option";
import UploadFileOption from "@/components/choose-file-screen/upload-file-option/upload-file-option";

function ChooseFile({ handleFile, fetchDataFromDB }) {

  return (
      <section className={classes.chooseFileContainer}>

        <div className={`${classes.optionContainer} shadow`}>
          <FetchOption fetchDataFromDB={fetchDataFromDB} />
        </div>

        <div className={`${classes.optionContainer} shadow`}>
          <UploadFileOption handleFile={handleFile} />
        </div>

      </section>
  );
}

export default ChooseFile;