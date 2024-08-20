import { Button, Tile } from "@carbon/react";

import classes from "@/components/choose-file-screen/choose-file.module.scss";
import {CloudDownload} from "@carbon/icons-react";

function FetchOption({ fetchDataFromDB }) {
  return (
      <Tile className={classes.tile}>
        <h6>Download the file from database</h6>
        <p>Downloaded preconfigured file</p>
        <Button size="md" onClick={fetchDataFromDB}>
          <CloudDownload />
          <span>Download</span>
        </Button>
      </Tile>
  );
}

export default FetchOption;