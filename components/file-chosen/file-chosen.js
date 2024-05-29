import { MenuButton, MenuItem } from "@carbon/react";
import Output from "@/components/output/output";
import classes from "./file-chosen.module.scss";

function FileChosen({ handleFileChange, excelFile }) {
  return (
      <div className={classes.container}>

        <div className={`${classes.menuContainer} shadow`}>
          <MenuButton label="actions"
                      kind="ghost"
                      className={classes.menu}
          >
            <MenuItem label="Change File"
                      onClick={handleFileChange}
                      kind="danger"
                      className={classes.menuItem}
            />
          </MenuButton>
        </div>

        <div className={classes.outputContainer}>
          <Output excelFile={excelFile}/>
        </div>

      </div>
  );
}

export default FileChosen;