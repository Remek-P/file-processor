import classes from "@/components/choose-file-screen/choose-file.module.scss";
import { FileUploader, Tile } from "@carbon/react";
import { Upload } from "@carbon/icons-react";

function UploadFromMachine({ setIsFileDelivered, handleFile }) {

  const fileTypes = [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ".xlsx",
    ".xls",
    ".csv",
    ".numbers",
    ".zip"
  ];

  const displayFormats = fileTypes.slice(1).map((fileType) => " "+fileType)

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

      <Tile className={`${classes.tile}`}>
        <FileUploader filenameStatus="complete"
                      labelTitle="Upload"
                      labelDescription={<>
                        Accepted file formats: <br/>
                        {displayFormats}
                      </>
                      }
                      buttonLabel={buttonLabel}
                      onChange={(e) => handleClick(e)}
                      accept={fileTypes}
                      name="uploader"
        />
      </Tile>
  );
}

export default UploadFromMachine;