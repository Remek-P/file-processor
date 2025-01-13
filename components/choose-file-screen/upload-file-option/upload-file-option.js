import classes from "@/components/choose-file-screen/choose-file.module.scss";
import { Button, Tile } from "@carbon/react";
import { Upload } from "@carbon/react/icons";
import IndexedDBSizeMonit from "@/components/notifications/IndexedDB-size-monit/IndexedDB-size-monit";
import { useState } from "react";
import useSizeNotification from "@/hooks/useSizeNotification";
import useRejectSizeNotification from "@/hooks/useRejectSizeNotification";
import useIndexedDBSize from "@/hooks/useIndexedDBSize";

function UploadFileOption({ setIsToBeUploaded }) {

  const [ showNotifications, setShowNotifications ] = useState(false);

  const { handleSizeNotification } = useSizeNotification();

  useIndexedDBSize() //Check if the IndexedDb size is significant

  const showNotification = () => {
    setShowNotifications(true)
  }

  const handleUpload = () => {
    setIsToBeUploaded(true);
  }

  const handleClick = () => {
    handleSizeNotification(showNotification, handleUpload);
  }

  const handleReject = useRejectSizeNotification(setShowNotifications, handleUpload);

  return (
      <>
        <Tile className={`${classes.tile} ${classes.optionContainerSpacing}`}>
          <div className={classes.optionContainerDescription}>
            <h6>Upload a file</h6>
            <p className={classes.optionContainerP}>to the computer or the database</p>
          </div>
          <Button size="md" onClick={handleClick}>
            <Upload size={16}/>
            <span>Upload</span>
          </Button>
        </Tile>
        <IndexedDBSizeMonit handleReject={handleReject} showNotifications={showNotifications} rejectText="Upload" />
      </>
  );
}

export default UploadFileOption;