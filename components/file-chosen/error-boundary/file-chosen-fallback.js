import React from "react";
import TextTile from "@/components/tile-type/text-tile/textTile";
import { Button } from "@carbon/react";
import classes from "./file-chosen-fallback.module.scss";
import Link from "next/link";

function FileChosenFallback({ fileName, syncAction = null, asyncAction = null }) {

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
      <TextTile type="children">
        <h2>The {fileName} file is unsupported or has been corrupted.</h2>
        <div className={classes.buttonContainer}>
          <Button className={classes.button} kind="danger" onClick={handleAsyncClick}>Delete file</Button>
          <Link href="/">
            <Button className={classes.button} kind="primary" onClick={handleSyncClick}>Load other file</Button>
          </Link>
        </div>
      </TextTile>
  );
}

export default FileChosenFallback;