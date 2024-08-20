import { useState } from "react";

import { CloseFilled, CloseOutline } from "@carbon/icons-react";

import classes from "../output.module.scss";
import {Tooltip} from "@carbon/react";

function DeleteOutput({ index, handleDeleteChecked }) {

  const [hover, setHover] = useState(false)

  return (
        <div key={index}
             className={classes.outputDeleteOutput}
             onMouseEnter={() => setHover(true)}
             onMouseLeave={() => setHover(false)}
        >

          <Tooltip label="Delete" align="bottom">
            <label htmlFor={`output${index}`} className={classes.label} aria-label="Delete">
              {!hover ? <CloseOutline aria-label="Delete"/> : <CloseFilled aria-label="Delete"/>}
            </label>
          </Tooltip>

            <input type="checkbox"
                   name="output"
                   id={`output${index}`}
                   value={index}
                   onChange={handleDeleteChecked}
                   className="visually-hidden"
            />

        </div>

  );
}

export default DeleteOutput;