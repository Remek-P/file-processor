import { useContext } from "react";

import { useRouter } from "next/router";

import {
  ExcludedDataGlobalContext,
  SearchSuggestionsOrderGlobalContext,
  ToggleIDViewGlobalContext,
  FileDataGlobalContext,
  ShowAllMetricsContext,
  SearchReducePerformanceContext,
  NumberOfOutputsContext,
  DecimalGlobalContext,
  DataToHideContext,
  QueryContext,
} from "@/context/global-context";

import DecimalPlace from "@/components/file-chosen/actions-menu/menu-items/decimal-place";

import { OverflowMenu, OverflowMenuItem } from "@carbon/react";

import classes from "../file-chosen.module.scss";

function ActionsMenu({
                       refreshData,
                       isSubheaders,
                       hideDB_ID_Tile,
                       handleResetID,
                       handleSubheadersChange,
                       handleFileChange,
                       isDirectFetchResults,
                     }) {

  const { isFetched } = useContext(FileDataGlobalContext);
  const [ , setQuery ] = useContext(QueryContext);

  const [ searchSuggestionsOrder, setSearchSuggestionsOrder ] = useContext(SearchSuggestionsOrderGlobalContext);
  const [ excludedArray, setExcludedArray ] = useContext(ExcludedDataGlobalContext);
  const [ toggleIDView, setToggleIDView ] = useContext(ToggleIDViewGlobalContext);
  const [ showAllMetrics, setShowAllMetrics ] = useContext(ShowAllMetricsContext);
  const [ isPerformanceStrainReduced, setIsPerformanceStrainReduced ] = useContext(SearchReducePerformanceContext);
  const [ , setNumberOfOutputs ] = useContext(NumberOfOutputsContext);
  const [ , setDecimal ] = useContext(DecimalGlobalContext);
  const [ dataToHide ] = useContext(DataToHideContext);

  const router = useRouter();

  const showHideDB_ID = toggleIDView ? "Hide" : "Show";
  const showHide0Values = showAllMetrics ? "Hide 0's" : "Show all values";
  const searchOrder = !searchSuggestionsOrder ? "Ascending" : "Descending";
  const containsSubheader = !isSubheaders ? "Contains subheader" : "No subheaders";
  const reducePerformanceStrain = isPerformanceStrainReduced ? "Search limit off" : "Search limit on";

  const outputID = Date.now();

  const addOutput = () => {
    setNumberOfOutputs(prevState => [ ...prevState, { id: outputID } ]);
    setQuery(undefined);
  }

  const handleDeleteAll = () => {
    setNumberOfOutputs([{ id: outputID }]);
    setExcludedArray([]);
  }

  const handleHideAllArrays = () => {
    if (excludedArray.length === dataToHide.length) return null
    setExcludedArray(dataToHide);
    // if (!isSubheaders) setHideTile(true);
  }

  const handleShowAllHiddenArrays = () => {
    if (excludedArray.length === 0) return null
    setExcludedArray([]);
    // if (!isSubheaders) setHideTile(false);
  }

  const handleIDView = () => setToggleIDView(prevState => !prevState);

  const handleShowAllMetrics = () => setShowAllMetrics(prevState => !prevState);

  const handleLink = () => {
    router.push('/delete-file', undefined, { shallow: true });
  }

  const handleSuggestionsDefaultOrder = () => setSearchSuggestionsOrder(undefined);

  const handleSuggestionsOrder = () => setSearchSuggestionsOrder(prevState => !prevState);

  const handleSearchReducePerformance = () => setIsPerformanceStrainReduced(prevState => !prevState);

  const resetDataFormatting = () => {
    setDecimal(undefined);
    setExcludedArray([])
    setSearchSuggestionsOrder(undefined);
    setShowAllMetrics(true)
  }

  //TODO: Handle data refresh - queries
  const handleRefresh = () => refreshData()

  return (
      <div className={ `${ classes.menuContainer } shadow` }>
        <OverflowMenu className={ classes.menu }
                      aria-label="actions menu"
                      flipped={ true }
        >

          <OverflowMenuItem itemText="Set decimal place"
                            onClick={ null }
                            disabled={ true }
                            className={ classes.menuItem }
                            hasDivider
          />
          <DecimalPlace/>

          <OverflowMenuItem itemText="Add output"
                            onClick={ addOutput }
                            className={ classes.menuItem }
                            hasDivider
          />

          <OverflowMenuItem itemText="Hide All Data"
                            onClick={ handleHideAllArrays }
                            className={ classes.menuItem }
                            hasDivider
          />

          <OverflowMenuItem itemText="Show All Data"
                            onClick={ handleShowAllHiddenArrays }
                            className={ classes.menuItem }
          />

          { //TODO: figure out how to refresh two+ inputs at the same time
            isFetched && isDirectFetchResults &&
              <OverflowMenuItem itemText="Refresh Data"
                                onClick={ handleRefresh }
                                className={ classes.menuItem }
                                aria-hidden={ !isFetched }
              />
          }

          <OverflowMenuItem itemText="Suggestions Order"
                            disabled={ true }
                            className={ classes.menuItem }
                            hasDivider
          />

          <OverflowMenuItem itemText="Reset"
                            onClick={ handleSuggestionsDefaultOrder }
                            className={ classes.menuItem }
          />

          <OverflowMenuItem itemText={ searchOrder }
                            onClick={ handleSuggestionsOrder }
                            className={ classes.menuItem }

          />

          <OverflowMenuItem itemText="Reset ID"
                            onClick={ handleResetID }
                            isDelete={ true }
                            className={ classes.menuItem }
                            hasDivider
          />

          { !hideDB_ID_Tile &&
              <OverflowMenuItem itemText={ `${ showHideDB_ID } DB ID` }
                                onClick={ handleIDView }
                                isDelete={ true }
                                className={ classes.menuItem }
                                aria-hidden={ hideDB_ID_Tile }
              /> }

          { !isSubheaders &&
              <OverflowMenuItem itemText={ showHide0Values }
                                onClick={ handleShowAllMetrics }
                                className={ classes.menuItem }
                                aria-hidden={ !isSubheaders }
              />
          }

          <OverflowMenuItem itemText="Reset Data Format"
                            onClick={ resetDataFormatting }
                            isDelete={ true }
                            className={ classes.menuItem }
                            hasDivider
          />

          <OverflowMenuItem itemText="Delete All"
                            onClick={ handleDeleteAll }
                            isDelete={ true }
                            className={ classes.menuItem }
          />

          <OverflowMenuItem itemText="Change File"
                            onClick={ handleFileChange }
                            isDelete={ true }
                            className={ classes.menuItem }
          />

          <OverflowMenuItem itemText="Delete stored files"
                            onClick={ handleLink }
                            isDelete={ true }
                            className={ classes.menuItem }
                            hasDivider
          />

          <OverflowMenuItem itemText={ containsSubheader }
                            onClick={ handleSubheadersChange }
                            isDelete={ true }
                            className={ classes.menuItem }
                            hasDivider
          />

          <OverflowMenuItem itemText={ reducePerformanceStrain }
                            onClick={ handleSearchReducePerformance }
                            isDelete={ true }
                            className={ classes.menuItem }
                            hasDivider
          />
        </OverflowMenu>

      </div>
  );
}

export default ActionsMenu;