import {FileUploader, Tile} from "@carbon/react";
import classes from "./choose-file.module.scss";

function ChooseFile({ onChange }) {
  return (
      <div className={`${classes.container} shadow`}>
        <Tile className={classes.tile}>
          <FileUploader filenameStatus="complete"
                        accept={[
                            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                          ".xlsx",
                          ".xls"]}
                        labelTitle="Please choose a file to upload"
                        labelDescription="Only Excel files will be accepted"
                        buttonLabel="Upload"
                        buttonKind="primary"
                        onChange={onChange}
          />
        </Tile>
      </div>
  );
}

export default ChooseFile;