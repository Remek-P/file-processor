import { OverflowMenu, MenuItem, MenuItemDivider, NumberInput } from "@carbon/react";

import classes from "../file-chosen.module.scss";

function ActionsMenu({
                       decimal,
                       handleOnChange,
                       addPerson,
                       deleteAll,
                       handleFileChange,
                     }) {
  return (
      <div className={`${classes.menuContainer} shadow`}>
        <OverflowMenu className={classes.menu}
                      aria-label="actions menu"
                      flipped={true}
        >
          <MenuItemDivider/>
          <NumberInput value={decimal}
                       min={0}
                       max={20}
                       onChange={handleOnChange}
                       step={1}
                       iconDescription="increase decrease"
                       label="Increase or decrease decimal place"
                       invalidText="Invalid value (0-20)"
                       size="sm"
                       id="decimal input"
          />
          <MenuItemDivider/>
          <MenuItem label="Add"
                    onClick={addPerson}
                    className={classes.menuItem}
          />
          <MenuItemDivider/>
          <MenuItem label="Delete All"
                    onClick={deleteAll}
                    kind="danger"
                    className={classes.menuItem}
          />
          <MenuItem label="Change File"
                    onClick={handleFileChange}
                    kind="danger"
                    className={classes.menuItem}
          />
        </OverflowMenu>
      </div>
  );
}

export default ActionsMenu;