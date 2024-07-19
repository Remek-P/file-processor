import { Tile } from "@carbon/react";

import classes from "../tile.module.scss";

function ComponentTile({ handleClick, children }) {
  return (
      <Tile className={`${classes.findUser} shadow`} onClick={handleClick}>
        { children }
      </Tile>
  );
}

export default ComponentTile;