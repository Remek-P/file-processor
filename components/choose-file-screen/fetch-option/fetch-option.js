import { Button, Tile } from "@carbon/react";

import classes from "@/components/choose-file-screen/choose-file.module.scss";
import {CloudDownload} from "@carbon/icons-react";

function FetchOption({ setIsFileDelivered, fetchDataFromDB }) {

  const handleClick = () => {
    fetchDataFromDB();
    setIsFileDelivered(true);
  }

  return (
      <Tile className={`${classes.tile} ${classes.optionContainerSpacing}`}>
        <div className={classes.optionContainerDescription}>
          <h6>Download from database</h6>
          <p className={classes.optionContainerP}>Downloaded preconfigured file</p>
        </div>
        <Button size="md" onClick={handleClick}>
          <CloudDownload />
          <span>Download</span>
        </Button>
      </Tile>
  );
}

export default FetchOption;