import { useContext, useMemo, useState } from 'react';

import SectionLayoutWithoutSubheaders
  from "@/components/output/section-layout/section-layout-without-subheaders/section-layout-without-subheaders";
import ShowNumbers from "@/components/output/show-metrics/show-numbers";
import ShowStringsAsNumbers from "@/components/output/show-metrics/show-strings-as-numbers";
import ShowDate from "@/components/output/show-metrics/show-date";
import ShowValues from "@/components/output/show-metrics/show-values";

import {
  regexOverall,
  separateNumbersAndStrings
} from "@/utils/sortUtils";

import { dateValidator } from "@/utils/dateUtils";

import { ShowAllMetricsContext, ToggleIDViewGlobalContext } from "@/context/global-context";
import {
  checkForNumber,
  checkForString,
  decimalPlaceSeparatorToComma, labelForEarlyReturn
} from "@/utils/general";

import { HEADER_LABEL } from "@/constants/constants";

function DisplayDataWithoutSubheaders({
                                        id,
                                        label,
                                        index,
                                        colDataArray,
                                        hideDB_ID_Tile,
                                      }) {
  const [ showAllMetrics ] = useContext(ShowAllMetricsContext);
  const [ toggleIDView ] = useContext(ToggleIDViewGlobalContext);

  const [ showDateFormat, setShowDateFormat ] = useState(false);
  const [ showPercentages, setShowPercentages ] = useState(undefined);

  const value = colDataArray[index];
  // Early return for ID columns when toggleIDView is false
  if (!hideDB_ID_Tile && !toggleIDView && label === HEADER_LABEL) return null;
  // Early return when there is a label, but no value
  // if (value === undefined) return null;

  // Extract the value once and memoize derived data
  const processedData = useMemo(() => {
    // Determine data type with a proper classification function
    const determineDataType = (data) => {

      const labelTestEarlyReturn = labelForEarlyReturn(label);

      if (labelTestEarlyReturn) return "excluded"

      if (checkForNumber(data)) return "number";

      if (checkForString(data)) {
        if (regexOverall.test(data)) return "string-number";

        if (dateValidator(data)) return "date";

        return "string";
      }

      return "other";
    };

    const dataType = determineDataType(value);

    // Process data based on its type
    let processedItem = {
      originalValue: value,
      dataType,
      isZero: false,
      numericValue: null,
      symbolsArray: null
    };

    // Type-specific processing
    if (dataType === "number") {
      processedItem.numericValue = +value;
      processedItem.isZero = processedItem.numericValue === 0;
    }
    else if (dataType === "string-number") {
      const refinedValue = decimalPlaceSeparatorToComma(value);
      const { numberOnlyData, checkSymbolsInArray } = separateNumbersAndStrings(refinedValue);

      processedItem.numericValue = numberOnlyData;
      processedItem.symbolsArray = checkSymbolsInArray;
      processedItem.isZero = numberOnlyData === 0;
    }

    return processedItem;
  }, [ colDataArray, index ]);

  // Memoize the component generation to prevent unnecessary re-renders
  const displayComponent = useMemo(() => {
    const { originalValue, dataType, isZero, numericValue, symbolsArray } = processedData;

    // Skip rendering zero values when showAllMetrics is false
    if (!showAllMetrics && isZero) return null

    // Return appropriate component based on data type
    switch (dataType) {
      case "number": {
        return (
            <ShowNumbers
                key={ id }
                data={{
                  value: numericValue,
                  label
                }}
                showPercentages={ showPercentages }
            />
        );
      }

      case "string-number": {
        return (
            <ShowStringsAsNumbers
                key={ id }
                data={{
                  value: numericValue,
                  symbolsArray,
                  label,
                  unrefined: originalValue
                }}
                showPercentages={ showPercentages }
            />
        );
      }

      case "date": {
        return (
            <ShowDate
                key={ id }
                id={ id }
                value={ originalValue }
                label={ label }
                showDateFormat={ showDateFormat }
                setShowDateFormat={ setShowDateFormat }
            />
        );
      }

      case "excluded":
      case "string":
      case "other":
      default: {
        return (
            <ShowValues
                key={ id }
                id={ id }
                label={ label }
                displayValue={ originalValue }
            />
        );
      }
    }
  }, [
    processedData,
    showAllMetrics,
    showPercentages,
    showDateFormat,
    id,
    label,
    setShowDateFormat
  ]);

  // Only return the section layout if there's a component to display
  if (!displayComponent) return null;

  return (
      <SectionLayoutWithoutSubheaders
          id={ id }
          dataType={ processedData.dataType === "string-number" ? "number" : processedData.dataType }
          showPercentages={ showPercentages }
          setShowPercentages={ setShowPercentages }
          label={ label }
          setShowDateFormat={ setShowDateFormat }
      >
        { displayComponent }
      </SectionLayoutWithoutSubheaders>
  );
}

export default DisplayDataWithoutSubheaders;