import {useContext} from "react";

import { useRouter } from "next/router";

import {
  ExcludedDataGlobalContext,
  SearchSuggestionsOrderGlobalContext,
  ToggleIDViewGlobalContext,
  FileDataGlobalContext,
  ShowAllMetricsContext,
  IsContainingSubheadersContext,
} from "@/context/global-context";

import DecimalPlace from "@/components/file-chosen/actions-menu/menu-items/decimal-place";
import ResetFormating from "@/components/file-chosen/actions-menu/menu-items/reset-formating";

import { OverflowMenu, OverflowMenuItem, MenuItemDivider } from "@carbon/react";

import classes from "../file-chosen.module.scss";
import {HEADER_LABEL} from "@/constants/constants";

function ActionsMenu({
                       headers,
                       addPerson,
                       refreshData,
                       isSubheaders,
                       hideDB_ID_Tile,
                       setNumberOfOutputs,
                       handleResetID,
                       handleFileChange,
                     }) {

  const { isFetched } = useContext(FileDataGlobalContext);
  const { overrideSubheadersDetection } = useContext(IsContainingSubheadersContext);

  const [ searchSuggestionsOrder, setSearchSuggestionsOrder ] = useContext(SearchSuggestionsOrderGlobalContext);
  const [ , setExcludedArray ] = useContext(ExcludedDataGlobalContext);
  const [ toggleIDView, setToggleIDView ] = useContext(ToggleIDViewGlobalContext);
  const [ showAllMetrics, setShowAllMetrics ] = useContext(ShowAllMetricsContext);

  const router = useRouter();

  const showHideDB_ID = toggleIDView ? "Hide" : "Show";
  const showHide0Values = showAllMetrics ? "Hide 0's" : "Show all";

  const searchOrder = !searchSuggestionsOrder ? "Ascending" : "Descending";

  const handleDeleteAll = () => {
    setNumberOfOutputs([]);
    setExcludedArray([]);
  }

  const handleHideAllArrays = () => {
    const uniqueHeaders = [...(new Set(headers))]
    const headersToHide = toggleIDView ? uniqueHeaders : uniqueHeaders.filter(header => header !== HEADER_LABEL);
    setExcludedArray([...(new Set(headersToHide))]);
  }

  const handleIDView = () => {
    setToggleIDView(prevState => !prevState);
  }

  const handleShowAllMetrics = () => {
    setShowAllMetrics(prevState => !prevState);
  }

  const handleLink = () => {
    router.push(`/delete-file`);
  }

  const handleShowAllHiddenArrays = () => {
    setExcludedArray([]);
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
          {!isSubheaders
              && <OverflowMenuItem itemText={showHide0Values}
                                   onClick={handleShowAllMetrics}
                                   className={classes.menuItem}
                                   aria-hidden={!isSubheaders}
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
          <OverflowMenuItem itemText="Delete stored files"
                            onClick={handleLink}
                            isDelete={true}
                            className={classes.menuItem}
                            hasDivider
          />
          <OverflowMenuItem itemText="Contains subheaders"
                            onClick={overrideSubheadersDetection}
                            isDelete={true}
                            className={classes.menuItem}
                            hasDivider
          />
        </OverflowMenu>
      </div>
  );
}

export default ActionsMenu;