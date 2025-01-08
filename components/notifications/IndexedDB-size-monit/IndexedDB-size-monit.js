import TextTile from "@/components/tile-type/text-tile/textTile";
import classes from "./IndexedDB-size-monit.module.scss";
import {Button} from "@carbon/react";
import Link from "next/link";

function IndexedDBSizeMonit({ handleReject }) {
  return (
      <div className={classes.notificationContainer}>

        <TextTile type="children">
          <h2 className={classes.header}>Memory warning</h2>

          <p>There is a lot of data stored in the memory, consider clearing it </p>

          <div className={classes.buttonContainer}>
            <Link href="/delete-file">
              <Button className={classes.button} kind="danger" onClick={null}>
                Clear
              </Button>
            </Link>

            <Button className={classes.button} onClick={handleReject}>
              Close
            </Button>
          </div>

        </TextTile>

      </div>
  );
}

export default IndexedDBSizeMonit;