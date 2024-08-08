import { Button, Tile } from "@carbon/react";

import classes from "@/components/choose-file-screen/choose-file.module.scss";

function FetchOption({ fetchDataFromDB }) {
  return (
      <Tile className={classes.tile}>
        <h6>Download the file from database</h6>
        <p>Downloaded preconfigured file</p>
        <Button size="md" onClick={fetchDataFromDB}>Download</Button>
      </Tile>
  );
}

export default FetchOption;