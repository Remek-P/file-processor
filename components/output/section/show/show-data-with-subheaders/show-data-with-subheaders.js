import { useRef, useState } from "react";
import {
  checkForNumber,
  checkForString,
  compareValues,
  regexOverall,
  separateNumbersAndStrings
} from "@/utils/sortUtils";
import SectionLayoutWithSubheaders from "@/components/output/section/section-layout/section-layout-with-subheaders/section-layout-with-subheaders";
import ShowNumbers from "@/components/output/section/show/show-metrics/show-numbers";
import ShowStringsAsNumbers from "@/components/output/section/show/show-metrics/show-strings-as-numbers";
import { dateValidator } from "@/utils/dateUtils";
import ShowDate from "@/components/output/section/show/show-metrics/show-date";
import ShowValues from "@/components/output/section/show/show-metrics/show-values";

function ShowDataWithSubheaders({
                                  value,
                                  colDataArray,
                                  labelDataArray,
                                  headerDataArray,
                                }) {

  const [ showAllMetrics, setShowAllMetrics ] = useState(false);
  const [ showPercentages, setShowPercentages ] = useState(undefined);
  const [ sort, setSort ] = useState(undefined);

  const dataType = useRef(undefined);
  const numbersEqualToZero = useRef(false);

  const chartData = [];

  // Sent as props to SectionLayout in case the data is of mixed type
  const valueArray = [];
  const headerValueArray = [];
  const labelValueArray = [];

  const handleChartData = (dataType, index, value) => {
    valueArray.push(dataType) //valueArray is sent as props and used to check the data type
    chartData.push({
      group: sortedLabels[index],
      value
    });
  }

  const handleChartDataIfDataIs0AndNot0 = (dataType, indexOfALabel, numberDataValue) => {
    if (!showAllMetrics) {
      if (numberDataValue !== 0) handleChartData(dataType, indexOfALabel, numberDataValue);
    } else handleChartData(dataType, indexOfALabel, numberDataValue);
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
      // Sort the indexed data based on the value and sort direction (sortedUtils)
      indexedDataArray.sort((a, b) => compareValues(a.value, b.value, sort));

      // Separate the sorted values and labels back into their respective arrays
      const sortedData = indexedDataArray.map(item => item.value);
      const sortedLabels = indexedDataArray.map(item => item.label);

      return { sortedData, sortedLabels };
    }
  }

  const { sortedData, sortedLabels } = sortDataAndLabelsArrayTogether();

  return (

      <SectionLayoutWithSubheaders value={value}
                                   sort={sort}
                                   setSort={setSort}
                                   chartData={chartData}
                                   valueArray={valueArray}
                                   showPercentages={showPercentages}
                                   setShowPercentages={setShowPercentages}
                                   numbersEqualToZero={numbersEqualToZero}
                                   showAllMetrics={showAllMetrics}
                                   setShowAllMetrics={setShowAllMetrics}
      >

        <div>
          {
            sortedData.map((data, index) => {

              if (checkForNumber(data)) {
                if (data === 0) numbersEqualToZero.current = true;
                dataType.current = "number";
                const numberData = {
                  value: +data,
                  label: sortedLabels[index],
                }

                handleChartDataIfDataIs0AndNot0(dataType.current, index, numberData.value)

                return (
                    <ShowNumbers key={`${data}+${sortedLabels[index]}`}
                                 data={numberData}
                                 showAllMetrics={showAllMetrics}
                                 showPercentages={showPercentages}
                    />
                )

              } else if (checkForString(data)) {

                const numberAsString = regexOverall.test(data);

                if (numberAsString) {

                  const { numberOnlyData, checkSymbolsInArray} = separateNumbersAndStrings(data);

                  if (+numberOnlyData === 0) numbersEqualToZero.current = true;

                  dataType.current = "number";
                  const numberData = {
                    value: +numberOnlyData,
                    symbolsArray: checkSymbolsInArray,
                    label: sortedLabels[index],
                    unrefined: data,
                  }

                  handleChartDataIfDataIs0AndNot0(dataType.current, index, +numberData.value)

                  return <ShowStringsAsNumbers key={`${data}+${sortedLabels[index]}`}
                                               data={numberData}
                                               showAllMetrics={showAllMetrics}
                                               showPercentages={showPercentages}
                  />

                } else if (dateValidator(data)) {
                  dataType.current = "date";
                  valueArray.push(dataType.current)
                  const dateData = {
                    value: data,
                    label: sortedLabels[index],
                  }

                  return <ShowDate key={`${data}+${sortedLabels[index]}`}
                                   value={dateData.value}
                                   label={dateData.label}
                  />

                } else {
                  dataType.current = "string";
                  valueArray.push(dataType.current)
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
                dataType.current = "other";
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

      </SectionLayoutWithSubheaders>
  );
}

export default ShowDataWithSubheaders;