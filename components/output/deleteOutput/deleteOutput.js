import { Tooltip } from "@carbon/react";

import classes from "../output.module.scss";

function DeleteOutput({ index, handleDeleteChecked }) {
  return (
      <div key={index} className={classes.outputDeleteOutput}>

        <Tooltip align="bottom" description="delete">
          <div>
          <label htmlFor={`output${index}`} className={classes.label}>
            <svg preserveAspectRatio="xMidYMid meet"
                 fill="currentColor"
                 width="32" height="32" viewBox="0 0 32 32"
                 aria-hidden="true"
                 xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 12H14V24H12zM18 12H20V24H18z"></path>
              <path d="M4 6V8H6V28a2 2 0 002 2H24a2 2 0 002-2V8h2V6zM8 28V8H24V28zM12 2H20V4H12z"></path>
              {/*<title>Delete</title>*/}
            </svg>
          </label>

          <input type="checkbox"
                 name="output"
                 id={`output${index}`}
                 value={index}
                 onChange={handleDeleteChecked}
                 className="visually-hidden"
          />
          </div>
        </Tooltip>

      </div>
  );
}

export default DeleteOutput;