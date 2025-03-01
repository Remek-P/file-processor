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

  const displayFormats = fileTypes.slice(1).map((fileType) => " " + fileType)

  const buttonLabel = "To computer"

  const labelDescription = `Accepted file formats:\n${ displayFormats }`;

  const handleClick = (e) => {
    handleFile(e)
    setIsFileDelivered(true);
  }

  return (

      <Tile className="shadow">
        <FileUploader filenameStatus="complete"
                      labelTitle="Upload"
                      labelDescription={ labelDescription }
                      buttonLabel={ buttonLabel }
                      onChange={ handleClick }
                      accept={ fileTypes }
                      name="uploader"
                      style={{ whiteSpace: "pre-line" }}
                      className={ classes.fileUploader }
        />
      </Tile>
  );
}

export default UploadToIndexedDB;