import {Button, FileUploader, Tile} from "@carbon/react";

import classes from "./choose-file.module.scss";

function ChooseFile({ handleFile, fetchDataFromDB }) {

  const fileTypes = [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ".xlsx",
    ".xls",
  ];

  return (
      <section className={classes.chooseFileContainer}>

        <div className={`${classes.optionContainer} shadow`}>
          <Tile className={classes.tile}>
            <h6>Download the file from database</h6>
            <p>Downloaded preconfigured file</p>
            <Button size="md" onClick={fetchDataFromDB}>Download</Button>
          </Tile>
        </div>

        <div className={`${classes.optionContainer} shadow`}>
          <Tile className={classes.tile}>
            <FileUploader filenameStatus="complete"
                          labelTitle="Please choose a file to upload"
                          labelDescription="Only Excel files will be accepted"
                          buttonLabel="Upload"
                          buttonKind="primary"
                          onChange={handleFile}
                          accept={fileTypes}
            />
          </Tile>
        </div>

      </section>
  );
}

export default ChooseFile;