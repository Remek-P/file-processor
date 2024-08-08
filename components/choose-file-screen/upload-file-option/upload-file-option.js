import classes from "@/components/choose-file-screen/choose-file.module.scss";
import {FileUploader, Tile} from "@carbon/react";

function UploadFileOption({ handleFile }) {

  const fileTypes = [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ".xlsx",
    ".xls",
  ];

  return (
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
  );
}

export default UploadFileOption;