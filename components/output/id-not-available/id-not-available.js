import TextTile from "@/components/tile-type/text-tile/textTile";
import { Tile } from "@carbon/react";

import classes from "../output.module.scss"

function IdNotAvailable({ labels, handleIDPick }) {
  return (

      <TextTile type="children">
        <h2>Please select the unique Identification Number</h2>
        <ul className={classes.grid}>
          {
            labels.map((label, index) =>
                  <li key={index} className={classes.pickIDLi}>
                    <Tile data-value={index} onClick={handleIDPick} >{label}</Tile>
                  </li>
            )
          }
        </ul>
      </TextTile>

  );
}

export default IdNotAvailable;