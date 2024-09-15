import classes from "@/components/choose-file-screen/choose-file.module.scss";
import {FileUploader, Tile} from "@carbon/react";
import {Upload} from "@carbon/icons-react";

function UploadFileOption({ setIsFileDelivered, handleFile }) {

  const fileTypes = [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ".xlsx",
    ".xls",
    ".csv",
    ".numbers",
    ".rar",
    ".zip"
  ];

  const buttonLabel = (
      <>
        <Upload/>
        <span>Upload</span>
      </>
  )

  const handleClick = (e) => {
    handleFile(e)
    setIsFileDelivered(true);
  }

  return (
      <Tile className={classes.tile}>
        <FileUploader filenameStatus="complete"
                      labelTitle="Please choose a file to upload"
                      labelDescription="Only selected files types will be accepted"
                      buttonLabel={buttonLabel}
                      onChange={(e) => handleClick(e)}
                      accept={fileTypes}
                      name="uploader"
        />
      </Tile>
  );
}

export default UploadFileOption;