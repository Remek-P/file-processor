import TextTile from "@/components/tile-type/text-tile/textTile";

import { Button } from "@carbon/react";
import classes from "./are-you-sure.module.scss";

function AreYouSure({ handleConfirm, handleReject }) {
  return (
      <div className={classes.notificationContainer}>

        <TextTile type="children">
          <h2 className={classes.header}>Are you sure?</h2>

          <div className={classes.buttonContainer}>
            <Button className={classes.button} kind="danger" onClick={handleConfirm}>
              Confirm
            </Button>

            <Button className={classes.button} onClick={handleReject}>
              Back
            </Button>
          </div>

        </TextTile>

      </div>
  );
}

export default AreYouSure;