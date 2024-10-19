import React from "react";
import TexTile from "@/components/tile-type/text-tile/texTile";
import { Button } from "@carbon/react";
import classes from "./file-chosen-fallback.module.scss";
import Link from "next/link";

function FileChosenFallback({ syncAction = null, asyncAction = null }) {

  const handleSyncClick = () => {
    if (syncAction) {
      syncAction();
    }
  };

  const handleAsyncClick = async () => {
    if (asyncAction) {
      await asyncAction();
    }
  };

  return (
      <TexTile type="children">
        <h2>The file is unsupported or has been corrupted.</h2>
        <div className={classes.buttonContainer}>
          <Button className={classes.button} kind="danger" onClick={handleAsyncClick}>Delete file</Button>
          <Link href="/">
            <Button className={classes.button} kind="primary" onClick={handleSyncClick}>Load other file</Button>
          </Link>
        </div>
      </TexTile>
  );
}

export default FileChosenFallback;