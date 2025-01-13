import classes from "@/components/choose-file-screen/choose-file.module.scss";
import { FileUploader, Tile } from "@carbon/react";

function UploadToIndexedDB({ setIsFileDelivered, handleFile }) {

  const fileTypes = [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ".xlsx",
    ".xls",
    ".csv",
    ".numbers",
    ".zip"
  ];

  const displayFormats = fileTypes.slice(1).map((fileType) => " "+fileType)

  const buttonLabel = "Upload locally"

  const labelDescription = `Accepted file formats:\n${displayFormats}`;

  const handleClick = (e) => {
    handleFile(e)
    setIsFileDelivered(true);
  }

  return (

      <Tile className={`${classes.tile}`}>
        <FileUploader filenameStatus="complete"
                      labelTitle="Upload"
                      labelDescription={labelDescription}
                      buttonLabel={buttonLabel}
                      onChange={(e) => handleClick(e)}
                      accept={fileTypes}
                      name="uploader"
                      style={{whiteSpace: "pre-line"}}
        />
      </Tile>
  );
}

export default UploadToIndexedDB;