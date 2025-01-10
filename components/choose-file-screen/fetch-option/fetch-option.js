import { Button, Tile } from "@carbon/react";

import classes from "@/components/choose-file-screen/choose-file.module.scss";
import {CloudDownload} from "@carbon/icons-react";
import {  useState } from "react";
import IndexedDBSizeMonit from "@/components/notifications/IndexedDB-size-monit/IndexedDB-size-monit";
import useRejectSizeNotification from "@/hooks/useRejectSizeNotification";
import useSizeNotification from "@/hooks/useSizeNotification";
import useIndexedDBSize from "@/hooks/useIndexedDBSize";

function FetchOption({ setIsFileDelivered, fetchDataFromDB }) {

  const [ showNotifications, setShowNotifications ] = useState(false);

  const { handleSizeNotification } = useSizeNotification();

  useIndexedDBSize(); //Check if the IndexedDb size is significant

  const showNotification = () => {
    setShowNotifications(true)
  }

  const handleFetching = () => {
    fetchDataFromDB();
    setIsFileDelivered(true);
  }

  const handleClick = () => {
    handleSizeNotification(showNotification, handleFetching);
  }

  const handleReject = useRejectSizeNotification(setShowNotifications, handleFetching);


  return (
      <>
        <Tile className={`${classes.tile} ${classes.optionContainerSpacing}`}>
          <div className={classes.optionContainerDescription}>
            <h6>Download from database</h6>
            <p className={classes.optionContainerP}>Downloaded preconfigured file</p>
          </div>
          <Button size="md" onClick={handleClick}>
            <CloudDownload/>
            <span>Download</span>
          </Button>
        </Tile>

        <IndexedDBSizeMonit handleReject={handleReject} showNotifications={showNotifications} rejectText="Download" />
      </>
  );
}

export default FetchOption;