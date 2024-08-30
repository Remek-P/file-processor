import { useRef, useState } from "react";

import ShowMetrics from "@/components/output/section/show/show-metrics/show-metrics";
import SectionLayout from "@/components/output/section/section-layout/section-layout";

import {dateValidator} from "@/utils/dateUtils";
import ShowNumbers from "@/components/output/section/show/show-metrics/show-numbers";
import ShowStringsAsNumbers from "@/components/output/section/show/show-metrics/show-strings-as-numbers";


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
  const [sort, setSort] = useState(false)

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

  // TODO: percentages and pseudo-numerical values treated like strings
  const sortDataAndLabelsArrayTogether = () => {
    if (sort === undefined) {
      const sortedData = headerValueArray;
      const sortedLabels = labelValueArray;
      
      return { sortedData, sortedLabels };
    }

    // Create an array of indices
    const indexedDataArray = headerValueArray.map((value, index) => ({ value, label: labelValueArray[index], index }));

    if (sort) {

      // Sort the indexed data based on the value
      indexedDataArray.sort((a, b) => {
        if (typeof a.value === 'string' && typeof b.value === 'string') {
          return a.value.localeCompare(b.value);
        }
        return +a.value - +b.value;
      });

      // Separate the sorted values and labels back into their respective arrays
      const sortedData = indexedDataArray.map(item => item.value);
      const sortedLabels = indexedDataArray.map(item => item.label);

      return { sortedData, sortedLabels };
    }
    if (!sort) {

      // Sort the indexed data based on the value
      indexedDataArray.sort((a, b) => {
        if (typeof a.value === 'string' && typeof b.value === 'string') {
          return b.value.localeCompare(a.value);
        }
        return +b.value - +a.value;
      });

      // Separate the sorted values and labels back into their respective arrays
      const sortedData = indexedDataArray.map(item => item.value);
      const sortedLabels = indexedDataArray.map(item => item.label);


      return { sortedData, sortedLabels };
    }
  }

  const {sortedData, sortedLabels} = sortDataAndLabelsArrayTogether();

  const symbolsArray = [">", ">=", "<", "<=","%", "p%", "$", "US$", "USD", "AUD", "A$", "CAD", "C$", "€", "EUR", "¥", "JPY", "£", "GBP", "CNY", "PLN", "zł"];
  const escapedRegexSymbolArray = symbolsArray.map(item => item.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  // const regexCheckForNumberWithSymbolBefore = new RegExp(`^(${escapedRegexSymbolArray.join("|")})\\s*\\d+(\\.\\d+)?$`);
  // const regexCheckForNumberWithSymbolAfter = new RegExp(`^\\d+(\\.\\d+)?\\s*(${escapedRegexSymbolArray.join("|")})$`);
  const regexOverall = new RegExp(`^((${escapedRegexSymbolArray.join("|")})\\s*|\\s*(${escapedRegexSymbolArray.join("|")})\\s*)?\\d+(\\.\\d+)?\\s*(${escapedRegexSymbolArray.join("|")})?$`);


  const containsSymbol = (value, symbolArray) => {
    if (typeof value === "string") {
      const array = symbolArray.map(symbol => value.includes(symbol));
      const displaySymbol = []
      array.find((symbol, index) => symbol === true ? displaySymbol.push(index) : null)
      return symbolArray[displaySymbol]
    }
  };
  
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
              const checkForNumber = !isNaN(+data);
              const checkForString = typeof data === "string";
              const isDate = dateValidator(data);

              // TODO: if (data.trim() === 0) return null

              if (checkForNumber) {
                if (data === 0) numbersEqualToZero.current = true;
                isNumber.current = true;
                const numberData = {
                  value: data,
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

              } else if (checkForString) {

                const numberAsString = regexOverall.test(data);

                if (numberAsString) {
                  const checkSymbolsInArray = symbolsArray.filter(symbol => data.includes(symbol));

                  let numberOnlyData = data;
                  // if number is a string with a symbol, filter out the symbol sign to create a clean string
                  if (checkSymbolsInArray.length > 0) {
                    for (const symbol in checkSymbolsInArray) {
                      numberOnlyData = numberOnlyData.replace(checkSymbolsInArray[symbol], "").trim()
                    }
                  }

                  if (+numberOnlyData === 0) numbersEqualToZero.current = true;
                  console.log("number as string", numbersEqualToZero.current)
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

                } else if (isDate) {
                  isNumber.current = false;
                  const dateData = {

                    value: data,
                    label: sortedLabels[index],
                  }
                } else {
                  isNumber.current = false;
                  const stringData = {
                    isNumber: false,
                    value: data,
                    label: sortedLabels[index],
                  };
                }

              } else {
                isNumber.current = false;
                const stringData = { value: data };
              }
            })
          }
          {/*{*/}
          {/*  sortedData.map((data, index) => {*/}
          {/*    const checkForString = typeof data === "string";*/}
          {/*    // check if contains a symbol from the array*/}
          {/*    const checkSymbolsInArray = checkForString && symbolsArray.filter(symbol => data.includes(symbol));*/}

          {/*    let processedData = data;*/}
          {/*    // if number is a string with a symbol, filter out the symbol sign to create a clean string*/}
          {/*    if (checkSymbolsInArray.length > 0) {*/}
          {/*      for (const sign in checkSymbolsInArray) {*/}
          {/*        processedData = checkForString && processedData.includes(checkSymbolsInArray[sign]) ? processedData.replace(checkSymbolsInArray[sign], "") : processedData;*/}
          {/*      }*/}
          {/*    }*/}

          {/*    // if displayed value is a number, assign true to isNumber.current to help display the actions for numerical values*/}
          {/*    if (typeof data === "number") isNumber.current = true*/}
          {/*    // if displayed value is a number in a string, assign true to isNumber.current to help display the actions for numerical values*/}
          {/*    else if (checkForString) isNumber.current = !isNaN(+processedData);*/}
          {/*    else isNumber.current = false;*/}

          {/*    if (+processedData === 0) numbersEqualToZero.current = true;*/}

          {/*    // Show data not equal to zero*/}
          {/*    if (!showAllMetrics) {*/}

          {/*      if (+processedData !== 0) {*/}
          {/*        handleChartData(isNumber.current, index, +processedData)*/}

          {/*        return <ShowMetrics key={`${data}+${sortedLabels[index]}`}*/}
          {/*                            index={index}*/}
          {/*                            colData={data}*/}
          {/*                            labelData={sortedLabels[index]}*/}
          {/*                            showPercentages={showPercentages}*/}
          {/*                            decimal={decimal}*/}
          {/*        />*/}
          {/*      }*/}
          {/*    }*/}

          {/*    else if (showAllMetrics) {*/}
          {/*      handleChartData(isNumber.current, index, +processedData)*/}

          {/*      return <ShowMetrics key={`${data}+${sortedLabels[index]}`}*/}
          {/*                          index={index}*/}
          {/*                          colData={data}*/}
          {/*                          labelData={sortedLabels[index]}*/}
          {/*                          showPercentages={showPercentages}*/}
          {/*                          decimal={decimal}*/}
          {/*      />*/}
          {/*    }*/}
          {/*  })*/}
          {/*}*/}
        </div>

      </SectionLayout>
  );
}

export default Show;