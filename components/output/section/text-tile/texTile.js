import classes from "@/components/output/section/section-module.module.scss";
import {Tile} from "@carbon/react";

function TexTile({ text, handleClick }) {
  return (
      <Tile className={`${classes.findUser} shadow`} onClick={handleClick}>
        <h3>{text}</h3>
      </Tile>
  );
}

export default TexTile;