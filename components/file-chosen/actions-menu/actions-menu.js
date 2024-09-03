import {OverflowMenu, OverflowMenuItem, MenuItemDivider } from "@carbon/react";

import {useContext} from "react";
import {
  ExcludedDataGlobalContext,
  SearchSuggestionsOrderGlobalContext,
  ToggleIDViewGlobalContext,
  FileDataGlobalContext
} from "@/context/global-context";

import classes from "../file-chosen.module.scss";
import DecimalPlace from "@/components/file-chosen/actions-menu/menu-items/decimal-place";
import ResetFormating from "@/components/file-chosen/actions-menu/menu-items/reset-formating";

function ActionsMenu({
                       headers,
                       addPerson,
                       refreshData,
                       hideDB_ID_Tile,
                       setNumberOfOutputs,
                       handleResetID,
                       handleFileChange,
                     }) {

  const { isFetched } = useContext(FileDataGlobalContext);
  
  const [searchSuggestionsOrder, setSearchSuggestionsOrder] = useContext(SearchSuggestionsOrderGlobalContext);
  const [, setExcludedArray] = useContext(ExcludedDataGlobalContext);
  const [toggleIDView, setToggleIDView] = useContext(ToggleIDViewGlobalContext);

  const showHideDB_ID = toggleIDView ? "Hide" : "Show";

  const searchOrder = !searchSuggestionsOrder ? "Ascending" : "Descending";

  const handleIDView = () => {
    setToggleIDView(prevState => !prevState);
  }

  const handleDeleteAll = () => {
    setNumberOfOutputs([]);
    setExcludedArray([]);
  }

  const handleShowAllHiddenArrays = () => {
    setExcludedArray([]);
  }
  const handleHideAllArrays = () => {
    setExcludedArray([...(new Set(headers))]);
  }

  const handleSuggestionsDefaultOrder = () => {
    setSearchSuggestionsOrder(undefined);
  }

  const handleSuggestionsOrder = () => {
    setSearchSuggestionsOrder(prevState => !prevState);
  }

  // TODO: Reset all data changes


  return (
      <div className={`${classes.menuContainer} shadow`}>
        <OverflowMenu className={classes.menu}
                      aria-label="actions menu"
                      flipped={true}
        >

          <MenuItemDivider/>
          <DecimalPlace />

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
          {!hideDB_ID_Tile
              && <OverflowMenuItem itemText={`${showHideDB_ID} DB ID`}
                                                onClick={handleIDView}
                                                isDelete={true}
                                                className={classes.menuItem}
                                                aria-hidden={hideDB_ID_Tile}
          />
          }
          <ResetFormating />
          <OverflowMenuItem itemText="Delete All"
                            onClick={handleDeleteAll}
                            isDelete={true}
                            className={classes.menuItem}
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