import { Button, Tile } from "@carbon/react";

import classes from "@/components/choose-file-screen/choose-file.module.scss";
import { CloudDownload } from "@carbon/react/icons";
import { useState } from "react";
import IndexedDBSizeMonit from "@/components/notifications/IndexedDB-size-monit/IndexedDB-size-monit";
import useRejectSizeNotification from "@/hooks/useRejectSizeNotification";
import useSizeNotification from "@/hooks/useSizeNotification";

function FetchOption({ setIsFileDelivered, fetchDataFromDB }) {

  const [ showNotifications, setShowNotifications ] = useState(false);

  const { handleSizeNotification } = useSizeNotification();

  const showNotification = () => setShowNotifications(true)

  const handleFetching = () => {
    fetchDataFromDB();
    setIsFileDelivered(true);
  }

  // Use a hook to check if IndexedDB storage reaches threshold and display notification if yes. If no download the file.
  const handleClick = () => {
    handleSizeNotification(showNotification, handleFetching);
  }

  const handleReject = useRejectSizeNotification(setShowNotifications, handleFetching);


  return (<>
    <Tile className={ `${ classes.tile } ${ classes.optionContainerSpacing }` }>
      <div className={ classes.optionContainerDescription }>
        <h6>Download from database</h6>
        <p className={ classes.optionContainerP }>Downloaded preconfigured file</p>
      </div>
      <Button size="md" onClick={ handleClick }>
        <CloudDownload size={ 16 } />
        <span>Download</span>
      </Button>
    </Tile>
    <IndexedDBSizeMonit handleReject={ handleReject } showNotifications={ showNotifications } rejectText="Download" />
  </>);
}

export default FetchOption;