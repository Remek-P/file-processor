import { useRef, useState } from "react";

import SectionLayout from "@/components/output/section/section-layout/section-layout";

import { dateValidator } from "@/utils/dateUtils";

import ShowNumbers from "@/components/output/section/show/show-metrics/show-numbers";
import ShowStringsAsNumbers from "@/components/output/section/show/show-metrics/show-strings-as-numbers";
import ShowDate from "@/components/output/section/show/show-metrics/show-date";
import ShowValues from "@/components/output/section/show/show-metrics/show-values";
import {
  checkForNumber,
  checkForString,
  compareValues,
  regexOverall,
  separateNumbersAndStrings
} from "@/utils/sortUtils";

function Show({
                value,
                decimal,
                colDataArray,
                labelDataArray,
                headerDataArray,
                excludedArray,
                setExcludedArray,
              }) {

  const [showAllMetrics, setShowAllMetrics] = useState(false);
  const [showPercentages, setShowPercentages] = useState(undefined);
  const [sort, setSort] = useState(undefined)

  const isNumber = useRef(undefined);
  const numbersEqualToZero = useRef(false);

  const chartData = [];

  // Sent as props to SectionLayout in case the data is of mixed type
  const valueArray = [];
  const headerValueArray = [];
  const labelValueArray = [];

  const handleChartData = (type, index, value) => {
    valueArray.push(type) //valueArray is sent as props and used to check if data is number
    chartData.push({
      group: sortedLabels[index],
      value
    });
  }

  const handleChartDataIfDataIs0AndNot0 = (isItANumber, indexOfALabel, numberDataValue) => {
    if (!showAllMetrics) {
      if (numberDataValue !== 0) handleChartData(isItANumber, indexOfALabel, numberDataValue);
    } else handleChartData(isItANumber, indexOfALabel, numberDataValue);
  }

  headerDataArray.map((header, index) => {
    if (header === value) {
      headerValueArray.push(colDataArray[index]);
      labelValueArray.push(labelDataArray[index]);
    }
  })

  const sortDataAndLabelsArrayTogether = () => {

    if (sort === undefined) {
      const sortedData = headerValueArray;
      const sortedLabels = labelValueArray;
      
      return { sortedData, sortedLabels };
    }

    // Create an array of indices
    const indexedDataArray = headerValueArray.map((value, index) => ({ value, label: labelValueArray[index], index }));

    if (sort || sort === false) {
      // Sort the indexed data based on the value and sort direction
      indexedDataArray.sort((a, b) => compareValues(a.value, b.value, sort));

      // Separate the sorted values and labels back into their respective arrays
      const sortedData = indexedDataArray.map(item => item.value);
      const sortedLabels = indexedDataArray.map(item => item.label);

      return { sortedData, sortedLabels };
    }
  }

  const {sortedData, sortedLabels} = sortDataAndLabelsArrayTogether();
  
  return (

      <SectionLayout value={value}
                     sort={sort}
                     setSort={setSort}
                     chartData={chartData}
                     valueArray={valueArray}
                     showPercentages={showPercentages}
                     setShowPercentages={setShowPercentages}
                     excludedArray={excludedArray}
                     setExcludedArray={setExcludedArray}
                     numbersEqualToZero={numbersEqualToZero}
                     setShowAllMetrics={setShowAllMetrics}
      >

        <div>
          {
            sortedData.map((data, index) => {

              if (checkForNumber(data)) {
                if (data === 0) numbersEqualToZero.current = true;
                isNumber.current = true;
                const numberData = {
                  value: +data,
                  label: sortedLabels[index],
                }

                handleChartDataIfDataIs0AndNot0(isNumber.current, index, numberData.value)

                return (
                    <ShowNumbers key={`${data}+${sortedLabels[index]}`}
                                 data={numberData}
                                 decimal={decimal}
                                 showAllMetrics={showAllMetrics}
                                 showPercentages={showPercentages}
                    />
                )

              } else if (checkForString(data)) {

                const numberAsString = regexOverall.test(data);

                if (numberAsString) {

                  const { numberOnlyData, checkSymbolsInArray} = separateNumbersAndStrings(data);

                  if (+numberOnlyData === 0) numbersEqualToZero.current = true;

                  isNumber.current = true;
                  const numberData = {
                    value: +numberOnlyData,
                    symbolsArray: checkSymbolsInArray,
                    label: sortedLabels[index],
                    unrefined: data,
                  }

                  handleChartDataIfDataIs0AndNot0(isNumber.current, index, +numberData.value)

                  return <ShowStringsAsNumbers key={`${data}+${sortedLabels[index]}`}
                                               data={numberData}
                                               decimal={decimal}
                                               showAllMetrics={showAllMetrics}
                                               showPercentages={showPercentages}
                  />

                } else if (dateValidator(data)) {
                  isNumber.current = false;
                  const dateData = {
                    value: data,
                    label: sortedLabels[index],
                  }

                  return <ShowDate key={`${data}+${sortedLabels[index]}`}
                                   value={dateData.value}
                                   label={dateData.label}
                  />

                } else {
                  isNumber.current = false;
                  const stringData = {
                    value: data,
                    label: sortedLabels[index],
                  };

                  return <ShowValues key={`${data}+${sortedLabels[index]}`}
                                     label={stringData.label}
                                     displayValue={stringData.value}
                  />
                }

              } else {
                isNumber.current = false;
                const otherData = {
                  value: data,
                  label: sortedLabels[index],
                };

                return <ShowValues key={`${data}+${sortedLabels[index]}`}
                                   label={otherData.label}
                                   displayValue={otherData.value}
                />
              }
            })
          }

        </div>

      </SectionLayout>
  );
}

export default Show;