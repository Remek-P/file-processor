import { useMemo, useState } from "react";

import SectionLayoutWithSubheaders
  from "@/components/output/section-layout/section-layout-with-subheaders/section-layout-with-subheaders";
import ShowNumbers from "@/components/output/show-metrics/show-numbers";
import ShowStringsAsNumbers from "@/components/output/show-metrics/show-strings-as-numbers";
import ShowDate from "@/components/output/show-metrics/show-date";
import ShowValues from "@/components/output/show-metrics/show-values";

import {
  compareValues,
  regexOverall,
  separateNumbersAndStrings
} from "@/utils/sortUtils";

import { dateValidator } from "@/utils/dateUtils";
import {
  checkForNumber,
  checkForString,
  decimalPlaceSeparatorToComma,
  labelForEarlyReturn,
} from "@/utils/general";
// TODO: what if one record contains a header, and other does not, same with label.
function DisplayDataWithSubheaders({
                                     id,
                                     value,
                                     colDataArray,
                                     labelDataArray,
                                     headerDataArray,
                                   }) {
  const [ showAllMetrics, setShowAllMetrics ] = useState(true);
  const [ showPercentages, setShowPercentages ] = useState(undefined);
  const [ showDateFormat, setShowDateFormat ] = useState(false);
  const [ sort, setSort ] = useState(undefined);

  const { headerValueArray, labelValueArray } = useMemo(() => {
    const headerValues = [];
    const labelValues = [];

    headerDataArray.forEach((header, index) => {
      if (header === value) {
        headerValues.push(colDataArray[index]);
        labelValues.push(labelDataArray[index]);
      }
    });

    return { headerValueArray: headerValues, labelValueArray: labelValues };
  }, [ headerDataArray, colDataArray, labelDataArray, value ]);

  const determineDataType = (data, label) => {
    // Early return for excluded labels
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

  const processedData = useMemo(() => {
    return headerValueArray.map((data, index) => {
      const label = labelValueArray[index];

      let type = determineDataType(data, label);
      let numericValue = null;
      let isZero = false;
      let symbolsArray = null;

      // Process based on type
      if (type === "number") {
        numericValue = +data;
        isZero = numericValue === 0;
      } else if (type === "string-number") {
        const refined = decimalPlaceSeparatorToComma(data);
        const { numberOnlyData, checkSymbolsInArray } = separateNumbersAndStrings(refined);

        numericValue = numberOnlyData;
        symbolsArray = checkSymbolsInArray;
        isZero = numericValue === 0;
      }

      return {
        originalData: data,
        label,
        type,
        numericValue,
        isZero,
        symbolsArray
      };
    });
  }, [ headerValueArray, labelValueArray ]);

  const sortedProcessedData = useMemo(() => {
    if (sort === undefined) return processedData;

    return [ ...processedData ].sort((a, b) => {
      if (a.type.includes("number") && b.type.includes("number")) {
        return compareValues(a.numericValue, b.numericValue, sort);
      }
      return compareValues(a.originalData, b.originalData, sort);
    });
  }, [ processedData, sort ]);

  const chartData = useMemo(() => {
    return sortedProcessedData
        .filter(item => showAllMetrics || !item.isZero)
        .map(item => ({
          group: item.label,
          value: item.numericValue !== null ? item.numericValue : 0
        }));
  }, [ sortedProcessedData, showAllMetrics ]);

  const numbersEqualToZero = useMemo(() => {
    return processedData.some(item =>
        (item.type === "number" || item.type === "string-number") && item.isZero
    );
  }, [ processedData ]);

  const valueTypeArray = useMemo(() => {
    return sortedProcessedData.map(item => item.type);
  }, [ sortedProcessedData ]);

  const renderedComponents = useMemo(() => {
    return sortedProcessedData.map((item) => {
      if (!showAllMetrics && item.isZero) return null;

      switch (item.type) {
        case "number":
          return (
              <ShowNumbers
                  key={ `${ item.originalData }+${ item.label }+${ id }` }
                  data={ { value: item.numericValue, label: item.label } }
                  showPercentages={ showPercentages }
              />
          );

        case "string-number":
          return (
              <ShowStringsAsNumbers
                  key={ `${ item.originalData }+${ item.label }+${ id }` }
                  data={{
                    value: item.numericValue,
                    symbolsArray: item.symbolsArray,
                    label: item.label,
                    unrefined: item.originalData
                  }}
                  showPercentages={ showPercentages }
              />
          );

        case "date":
          return (
              <ShowDate
                  key={ `${ item.originalData }+${ item.label }+${ id }` }
                  value={ item.originalData }
                  label={ item.label }
                  showDateFormat={ showDateFormat }
                  setShowDateFormat={ setShowDateFormat }
              />
          );
        case "excluded":
        default:
          return (
              <ShowValues
                  key={ `${ item.originalData }+${ item.label }+${ id }` }
                  label={ item.label }
                  displayValue={ item.originalData }
              />
          );
      }
    }).filter(Boolean);
  }, [ sortedProcessedData, showAllMetrics, showPercentages, showDateFormat, id ]);

  return (
      <SectionLayoutWithSubheaders
          id={ id }
          value={ value }
          sort={ sort }
          setSort={ setSort }
          chartData={ chartData }
          valueTypeArray={ valueTypeArray }
          showPercentages={ showPercentages }
          setShowPercentages={ setShowPercentages }
          numbersEqualToZero={ numbersEqualToZero }
          showAllMetrics={ showAllMetrics }
          setShowAllMetrics={ setShowAllMetrics }
          setShowDateFormat={ setShowDateFormat }
      >
        <div>{ renderedComponents }</div>

      </SectionLayoutWithSubheaders>
  );
}

export default DisplayDataWithSubheaders;