import classes from "@/components/choose-file-screen/choose-file.module.scss";
import { FileUploader, Tile } from "@carbon/react";
import { Upload } from "@carbon/icons-react";
import {useContext, useState} from "react";
import {FileDataGlobalContext} from "@/context/global-context";

function UploadToDB({ setIsFileDelivered }) {

  const { setLoading, addWarnings, isFetched } =useContext(FileDataGlobalContext);


  const fileTypes = [
    ".csv",
  ];

  const displayFormats = fileTypes.map((fileType) => " "+fileType)

  const buttonLabel = (
      <>
        <Upload/>
        <span>Upload to database</span>
      </>
  )
  const labelDescription = <>
    Accepted file formats: <br />
    {displayFormats}
  </>

  const [file, setFile] = useState(null);

  const handleUpload = async (e) => {
    setFile(e.target.files[0]);

    setLoading(true);

    const formData = new FormData();
    formData.append('csv', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        setIsFileDelivered(true);
        isFetched(true)
      } else {
        addWarnings('Error uploading file.');
      }
    } catch (error) {
      console.error('Upload failed', error);
      addWarnings('Error uploading file.');
    } finally {
      setLoading(false);
    }
  };


  return (
      <>
        <Tile className={`${classes.tile}`}>
          <FileUploader filenameStatus="complete"
                        labelTitle="Upload"
                        labelDescription={labelDescription}
                        buttonLabel={buttonLabel}
                        onChange={(e) => handleUpload(e)}
                        accept={fileTypes}
                        name="uploader"
                        disabled={true}
          />
        </Tile>

        <Tile className={`${classes.tile}`}>

        </Tile>
      </>
  );
}

export default UploadToDB;