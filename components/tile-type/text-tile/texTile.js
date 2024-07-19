import { Tile } from "@carbon/react";

import classes from "../tile.module.scss";

function TexTile({ text, handleClick }) {
  return (
      <Tile className={`${classes.findUser} shadow`} onClick={handleClick}>
        <h3>{text}</h3>
      </Tile>
  );
}

export default TexTile;