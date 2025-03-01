import classes from "@/components/choose-file-screen/choose-file.module.scss";
import { FileUploader, Tile } from "@carbon/react";
import { useContext } from "react";
import { FileDataGlobalContext, IsLoadingContext, WarningsContext } from "@/context/global-context";

function UploadToDB({ setIsFileDelivered }) {
  const { isDataFetched } = useContext(FileDataGlobalContext);
  const { addWarnings } = useContext(WarningsContext);
  const [ , setIsLoading ] = useContext(IsLoadingContext);

  const fileTypes = [ ".csv" ];
  const displayFormats = fileTypes.map((fileType) => " " + fileType);

  const buttonLabel = "To a database";

  const labelDescription = `Accepted file formats: \n${ displayFormats }`;

  const handleUpload = async (e) => {
    e.preventDefault();

    const selectedFile = e.target.files[0];

    if (!selectedFile) {
      addWarnings("No file selected.");
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append("csv", selectedFile);

    try {
      const res = await fetch("/api/dbUpload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok && data.url) {
        setIsFileDelivered(true);
        isDataFetched(true);
        alert(`File uploaded successfully: ${ data.url }`);
      } else {
        addWarnings("Error uploading file.");
      }
    } catch (error) {
      console.error("Upload failed", error);
      addWarnings("Error uploading file.");
    } finally {
      setIsLoading(false);
    }
  };


  return (
        <Tile className="shadow">
          <FileUploader
              filenameStatus="complete"
              labelTitle="Upload"
              labelDescription={ labelDescription }
              buttonLabel={ buttonLabel }
              onChange={ (e) => handleUpload(e) }
              accept={ fileTypes }
              name="uploader"
              disabled={ true }
              style={{ whiteSpace: "pre-line" }}
              className={ `${classes.fileUploader} ${classes.toDB}` }
          />
        </Tile>
  );
}

export default UploadToDB;
