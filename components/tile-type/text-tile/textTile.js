import { Tile } from "@carbon/react";

import classes from "../tile.module.scss";

function TextTile({ text, handleClick, type, children = null }) {

  if (type === "children") {
    return (
        <Tile className={`${classes.selectID} shadow`}>
          { children }
        </Tile>
    )
  }

  return (
      <Tile className={`${classes.findUser} shadow`} onClick={handleClick}>
        <h3>{text}</h3>
        <div>{ children }</div>
      </Tile>
  );
}

export default TextTile;