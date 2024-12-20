import {useContext} from "react";

import { useRouter } from "next/router";

import {
  ExcludedDataGlobalContext,
  SearchSuggestionsOrderGlobalContext,
  ToggleIDViewGlobalContext,
  FileDataGlobalContext,
  ShowAllMetricsContext,
  SearchReducePerformanceContext,
  NumberOfOutputsContext,
} from "@/context/global-context";

import DecimalPlace from "@/components/file-chosen/actions-menu/menu-items/decimal-place";
import ResetFormating from "@/components/file-chosen/actions-menu/menu-items/reset-formating";

import { OverflowMenu, OverflowMenuItem, MenuItemDivider } from "@carbon/react";

import classes from "../file-chosen.module.scss";
import {HEADER_LABEL} from "@/constants/constants";

function ActionsMenu({
                       headers,
                       userQuery,
                       refreshData,
                       isSubheaders,
                       hideDB_ID_Tile,
                       handleResetID,
                       handleSubheadersChange,
                       handleFileChange,
                     }) {

  const { isFetched } = useContext(FileDataGlobalContext);

  const [ searchSuggestionsOrder, setSearchSuggestionsOrder ] = useContext(SearchSuggestionsOrderGlobalContext);
  const [ , setExcludedArray ] = useContext(ExcludedDataGlobalContext);
  const [ toggleIDView, setToggleIDView ] = useContext(ToggleIDViewGlobalContext);
  const [ showAllMetrics, setShowAllMetrics ] = useContext(ShowAllMetricsContext);
  const [ isPerformanceStrainReduced, setIsPerformanceStrainReduced ] = useContext(SearchReducePerformanceContext);
  const [ , setNumberOfOutputs ] = useContext(NumberOfOutputsContext);

  const router = useRouter();

  const showHideDB_ID = toggleIDView ? "Hide" : "Show";
  const showHide0Values = showAllMetrics ? "Hide 0's" : "Show all values";
  const searchOrder = !searchSuggestionsOrder ? "Ascending" : "Descending";
  const containsSubheader = !isSubheaders ? "Contains subheader" : "No subheaders";
  const reducePerformanceStrain = isPerformanceStrainReduced ? "Search limit off" : "Search limit on";

  const addPerson = () => {
    const outputID = Date.now();
    setNumberOfOutputs(prevState => [...prevState, {id: outputID}]);
  }

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
    router.push('/delete-file', undefined, { shallow: true });
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

  const handleSearchReducePerformance = () => {
    setIsPerformanceStrainReduced(prevState => !prevState);
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

          <OverflowMenuItem itemText="Add output"
                            onClick={addPerson}
                            className={classes.menuItem}
                            hasDivider
          />

          <OverflowMenuItem itemText="Hide All Data"
                            onClick={handleHideAllArrays}
                            className={classes.menuItem}
                            hasDivider
          />

          <OverflowMenuItem itemText="Show All Data"
                            onClick={handleShowAllHiddenArrays}
                            className={classes.menuItem}
          />

          {isFetched && <OverflowMenuItem itemText="Refresh Data"
                                          onClick={refreshData.bind(userQuery)}
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
          />}

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

          <OverflowMenuItem itemText={containsSubheader}
                            onClick={handleSubheadersChange}
                            isDelete={true}
                            className={classes.menuItem}
                            hasDivider
          />

          <OverflowMenuItem itemText={reducePerformanceStrain}
                            onClick={handleSearchReducePerformance}
                            isDelete={true}
                            className={classes.menuItem}
                            hasDivider
          />
        </OverflowMenu>
      </div>
  );
}

export default ActionsMenu;