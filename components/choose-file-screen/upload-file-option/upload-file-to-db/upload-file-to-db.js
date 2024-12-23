import classes from "@/components/choose-file-screen/choose-file.module.scss";
import { FileUploader, Tile } from "@carbon/react";
import { Upload } from "@carbon/icons-react";
import { useContext } from "react";
import { FileDataGlobalContext } from "@/context/global-context";

function UploadToDB({ setIsFileDelivered }) {
  const { setLoading, addWarnings, isDataFetched } = useContext(FileDataGlobalContext);

  const fileTypes = [".csv"];
  const displayFormats = fileTypes.map((fileType) => " " + fileType);

  const buttonLabel = (
      <>
        <Upload />
        <span>Upload to database</span>
      </>
  );

  const labelDescription = (
      <>
        Accepted file formats: <br />
        {displayFormats}
      </>
  );

  const handleUpload = async (e) => {
    e.preventDefault();

    const selectedFile = e.target.files[0];

    // Ensure a file is selected
    if (!selectedFile) {
      addWarnings("No file selected.");
      return;
    }

    // Set the loading state to true
    setLoading(true);

    const formData = new FormData();
    formData.append("csv", selectedFile);  // Ensure the field name matches the backend

    try {
      // Send the file to the API endpoint for processing and uploading to S3
      const res = await fetch("/api/dbUpload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok && data.url) {
        // Success: File has been uploaded to S3
        setIsFileDelivered(true);
        isDataFetched(true);
        alert(`File uploaded successfully: ${data.url}`);
      } else {
        // Error: Display warnings
        addWarnings("Error uploading file.");
      }
    } catch (error) {
      console.error("Upload failed", error);
      addWarnings("Error uploading file.");
    } finally {
      setLoading(false);
    }
  };


  return (
      <>
        <Tile className={`${classes.tile}`}>
          <FileUploader
              filenameStatus="complete"
              labelTitle="Upload"
              labelDescription={labelDescription}
              buttonLabel={buttonLabel}
              onChange={(e) => handleUpload(e)}
              accept={fileTypes}
              name="uploader"
              disabled={true}
          />
        </Tile>

        <Tile className={`${classes.tile}`} />
      </>
  );
}

export default UploadToDB;
