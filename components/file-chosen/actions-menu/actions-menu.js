import { OverflowMenu, OverflowMenuItem, MenuItemDivider, NumberInput } from "@carbon/react";

import classes from "../file-chosen.module.scss";

function ActionsMenu({
                       decimal,
                       deleteAll,
                       addPerson,
                       isFetched,
                       setIDIndex,
                       refreshData,
                       toggleIDView,
                       setToggleIDView,
                       hideDB_ID_Tile,
                       searchSuggestionsOrder,
                       setSearchSuggestionsOrder,
                       handleFileChange,
                       handleHideAllArrays,
                       handleDecimalChange,
                       handleShowAllHiddenArrays,
                     }) {

  const showHideDB_ID = toggleIDView ? "Hide" : "Show";

  const searchOrder = !searchSuggestionsOrder ? "Ascending" : "Descending";

  const handleSuggestionsDefaultOrder = () => {
    setSearchSuggestionsOrder(undefined);
  }

  const handleSuggestionsOrder = () => {
    setSearchSuggestionsOrder(prevState => !prevState);
  }

  const handleResetID = () => {
    setIDIndex(-1)
  }

  const handleIDView = () => {
    setToggleIDView(prevState => !prevState);
  }


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
                       onChange={handleDecimalChange}
                       step={1}
                       iconDescription="increase decrease"
                       label="Set decimal place"
                       invalidText="Invalid value (0-20)"
                       size="sm"
                       id="decimal input"
                       isFocused={false}
          />

          <OverflowMenuItem itemText="Add"
                            onClick={addPerson}
                            className={classes.menuItem}
                            hasDivider
          />

          <OverflowMenuItem itemText="Hide All Sections"
                            onClick={handleHideAllArrays}
                            className={classes.menuItem}
                            hasDivider
          />
          <OverflowMenuItem itemText="Show All Sections"
                            onClick={handleShowAllHiddenArrays}
                            className={classes.menuItem}
          />
          {isFetched && <OverflowMenuItem itemText="Refresh Data"
                                          onClick={refreshData}
                                          className={classes.menuItem}
                                          aria-hidden={!isFetched}
          />
          }

          <OverflowMenuItem itemText="Suggestions Order"
                            disabled={true}
                            className={classes.menuItem}
                            hasDivider
          />
          <OverflowMenuItem itemText="Reset"
                            onClick={handleSuggestionsDefaultOrder}
                            className={classes.menuItem}
          />
          <OverflowMenuItem itemText={searchOrder}
                            onClick={handleSuggestionsOrder}
                            className={classes.menuItem}

          />

          <OverflowMenuItem itemText="Reset ID"
                            onClick={handleResetID}
                            isDelete={true}
                            className={classes.menuItem}
                            hasDivider
          />
          {!hideDB_ID_Tile && <OverflowMenuItem itemText={`${showHideDB_ID} DB ID`}
                                                onClick={handleIDView}
                                                isDelete={true}
                                                className={classes.menuItem}
                                                aria-hidden={hideDB_ID_Tile}
          />
          }

          <OverflowMenuItem itemText="Delete All"
                            onClick={deleteAll}
                            isDelete={true}
                            className={classes.menuItem}
                            hasDivider
          />
          <OverflowMenuItem itemText="Change File"
                            onClick={handleFileChange}
                            isDelete={true}
                            className={classes.menuItem}
          />
        </OverflowMenu>
      </div>
  );
}

export default ActionsMenu;