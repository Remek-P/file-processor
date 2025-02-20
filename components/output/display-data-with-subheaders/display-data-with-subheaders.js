import { useRef, useState } from "react";

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
  decimalPlaceSeparatorToComma
} from "@/utils/general";

function DisplayDataWithSubheaders({
                                     value,
                                     colDataArray,
                                     labelDataArray,
                                     headerDataArray,
                                   }) {

  const [ showAllMetrics, setShowAllMetrics ] = useState(true);
  const [ showPercentages, setShowPercentages ] = useState(undefined);
  const [ showDateFormat, setShowDateFormat ] = useState(false);
  const [ sort, setSort ] = useState(undefined);

  const dataType = useRef(undefined);
  const numbersEqualToZero = useRef(false);

  const chartData = [];

  // Sent as props to SectionLayout in case the data is of mixed type
  const valueTypeArray = [];
  const headerValueArray = [];
  const labelValueArray = [];

  const handleChartData = (dataType, index, value) => {
    valueTypeArray.push(dataType) //valueTypeArray is sent as props and used to check the data type
    chartData.push({
      group: sortedLabels[index],
      value
    });
  }

  const handleChartDataIfDataIs0AndNot0 = (dataType, indexOfALabel, numberDataValue) => {
    if (!showAllMetrics && numberDataValue !== 0) handleChartData(dataType, indexOfALabel, numberDataValue);
    else handleChartData(dataType, indexOfALabel, numberDataValue);
  }

  headerDataArray.forEach((header, index) => {
    if (header === value) {
      headerValueArray.push(colDataArray[index]);
      labelValueArray.push(labelDataArray[index]);
    }
  })

  const sortDataAndLabelsArrayTogether = () => {

    if (sort === undefined) return { sortedData: headerValueArray, sortedLabels: labelValueArray };

    // Create an array of indices
    const indexedDataArray = headerValueArray.map((value, index) => ({ value, label: labelValueArray[index], index }));

    // Sort the indexed data based on the value and sort direction (sortedUtils)
    indexedDataArray.sort((a, b) => compareValues(a.value, b.value, sort));

    // Separate the sorted values and labels back into their respective arrays
    const sortedData = indexedDataArray.map(item => item.value);
    const sortedLabels = indexedDataArray.map(item => item.label);

    return { sortedData, sortedLabels };
  }

  const { sortedData, sortedLabels } = sortDataAndLabelsArrayTogether();

  return (

      <SectionLayoutWithSubheaders value={ value }
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

        <div>
          {
            sortedData.map((data, index) => {

              if (checkForNumber(data)) {

                const isZero = data === 0;
                if (isZero) numbersEqualToZero.current = true;
                if (isZero && !showAllMetrics) return null;

                dataType.current = "number";
                const numberData = {
                  value: +data,
                  label: sortedLabels[index],
                }

                handleChartDataIfDataIs0AndNot0(dataType.current, index, numberData.value)

                return (
                    <ShowNumbers key={ `${ data }+${ sortedLabels[index] }` }
                                 data={ numberData }
                                 showPercentages={ showPercentages }
                    />
                )

              } else if (checkForString(data)) {

                const numberAsString = regexOverall.test(data);

                if (numberAsString) {
                  const refinedValue = decimalPlaceSeparatorToComma(data);
                  const { numberOnlyData, checkSymbolsInArray } = separateNumbersAndStrings(refinedValue);

                  const isZero = numberOnlyData === 0;
                  if (isZero && !showAllMetrics) return null;

                  if (isZero) numbersEqualToZero.current = true;


                  dataType.current = "number";
                  const numberData = {
                    value: numberOnlyData,
                    symbolsArray: checkSymbolsInArray,
                    label: sortedLabels[index],
                    unrefined: data,
                  }

                  handleChartDataIfDataIs0AndNot0(dataType.current, index, numberData.value)

                  return <ShowStringsAsNumbers key={ `${ data }+${ sortedLabels[index] }` }
                                               data={ numberData }
                                               showPercentages={ showPercentages }
                  />

                } else if (dateValidator(data)) {

                  dataType.current = "date";
                  valueTypeArray.push(dataType.current)

                  return <ShowDate key={ `${ data }+${ sortedLabels[index] }` }
                                   value={ data }
                                   label={ sortedLabels[index] }
                                   showDateFormat={ showDateFormat }
                                   setShowDateFormat={ setShowDateFormat }
                  />

                } else {
                  dataType.current = "string";
                  valueTypeArray.push(dataType.current)

                  return <ShowValues key={ `${ data }+${ sortedLabels[index] }` }
                                     label={ sortedLabels[index] }
                                     displayValue={ data }
                  />
                }

              } else {
                dataType.current = "other";

                return <ShowValues key={ `${ data }+${ sortedLabels[index] }` }
                                   label={ sortedLabels[index] }
                                   displayValue={ data }
                />
              }
            })
          }

        </div>

      </SectionLayoutWithSubheaders>
  );
}

export default DisplayDataWithSubheaders;