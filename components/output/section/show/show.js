import { useRef, useState } from "react";

import ShowMetrics from "@/components/output/section/show/show-metrics/show-metrics";
import SectionLayout from "@/components/output/section/section-layout/section-layout";

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

  const signsArray = ["%", "$", "US$", "USD", "AUD", "A$", "CAD", "C$", "€", "EUR", "¥", "JPY", "£", "GBP", "CNY", "PLN", "zł", ">", ">=", "<", "<="];

  const handleChartData = (type, index, value) => {
    valueArray.push(type) //valueArray is sent as props and used to check if data is number
    chartData.push({
      group: sortedLabels[index],
      value
    });
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
              const checkForString = typeof data === "string";
              // check if contains a symbol from the array
              const checkSymbolsInArray = checkForString && signsArray.filter(symbol => data.includes(symbol));

              let processedData = data;
              // if number is a string with a symbol, filter out the symbol sign to create a clean string
              if (checkSymbolsInArray.length > 0) {
                for (const sign in checkSymbolsInArray) {
                  processedData = checkForString && processedData.includes(checkSymbolsInArray[sign]) ? processedData.replace(checkSymbolsInArray[sign], "") : processedData;
                }
              }

              // if displayed value is a number, assign true to isNumber.current to help display the actions for numerical values
              if (typeof data === "number") isNumber.current = true
              // if displayed value is a number in a string, assign true to isNumber.current to help display the actions for numerical values
              else if (checkForString) isNumber.current = !isNaN(+processedData);
              else isNumber.current = false;

              if (+processedData === 0) numbersEqualToZero.current = true;

              // Show data not equal to zero
              if (!showAllMetrics) {

                if (+processedData !== 0) {
                  handleChartData(isNumber.current, index, +processedData)

                  return <ShowMetrics key={`${data}+${sortedLabels[index]}`}
                                      index={index}
                                      colData={data}
                                      labelData={sortedLabels[index]}
                                      showPercentages={showPercentages}
                                      decimal={decimal}
                  />
                }
              }

              else if (showAllMetrics) {
                handleChartData(isNumber.current, index, +processedData)

                return <ShowMetrics key={`${data}+${sortedLabels[index]}`}
                                    index={index}
                                    colData={data}
                                    labelData={sortedLabels[index]}
                                    showPercentages={showPercentages}
                                    decimal={decimal}
                />
              }
            })
          }
          {/*{*/}
          {/*  headerDataArray.map((header, index) => {*/}
          {/*        // filter for the same value, to create a card view*/}
          {/*        if (header === value) {*/}
          {/*          */}

          {/*          const checkForString = typeof colDataArray[index] === "string";*/}
          {/*          // check if contains a symbol from the array*/}
          {/*          const checkSymbolsInArray = checkForString && signsArray.filter(symbol => colDataArray[index].includes(symbol));*/}

          {/*          let cleanValue = colDataArray[index];*/}
          {/*          // if number is a string with a symbol, filter out the symbol sign to create a clean string*/}
          {/*          if (checkSymbolsInArray.length > 0) {*/}
          {/*            for (const sign in checkSymbolsInArray) {*/}
          {/*              cleanValue = checkForString && cleanValue.includes(checkSymbolsInArray[sign]) ? cleanValue.replace(checkSymbolsInArray[sign], "") : cleanValue;*/}
          {/*            }*/}
          {/*          }*/}


          {/*          // if displayed value is a number, assign true to isNumber.current to help display the actions for numerical values*/}
          {/*          if (typeof colDataArray[index] === "number") isNumber.current = true*/}
          {/*          // if displayed value is a number in a string, assign true to isNumber.current to help display the actions for numerical values*/}
          {/*          else if (checkForString) isNumber.current = !isNaN(+cleanValue);*/}
          {/*          else isNumber.current = false;*/}


          {/*          // Needed for displaying hide/show 0s toggle*/}
          {/*          if (+cleanValue === 0) numbersEqualToZero.current = true;*/}


          {/*          // Show data not equal to zero*/}
          {/*          if (!showAllMetrics) {*/}

          {/*            if (+cleanValue !== 0) {*/}
          {/*              handleChartData(isNumber.current, index, +cleanValue)*/}

          {/*              return <ShowMetrics key={`${colDataArray[index]}+${labelDataArray[index]}`}*/}
          {/*                                  index={index}*/}
          {/*                                  colData={colDataArray[index]}*/}
          {/*                                  labelData={labelDataArray[index]}*/}
          {/*                                  showPercentages={showPercentages}*/}
          {/*                                  decimal={decimal}*/}
          {/*                  />*/}
          {/*            }*/}
          {/*          }*/}

          {/*            else if (showAllMetrics) {*/}
          {/*              handleChartData(isNumber.current, index, +cleanValue)*/}

          {/*              return <ShowMetrics key={`${colDataArray[index]}+${labelDataArray[index]}`}*/}
          {/*                                  index={index}*/}
          {/*                                  colData={colDataArray[index]}*/}
          {/*                                  labelData={labelDataArray[index]}*/}
          {/*                                  showPercentages={showPercentages}*/}
          {/*                                  decimal={decimal}*/}
          {/*              />*/}
          {/*          }*/}


          {/*        }*/}
          {/*      }*/}
          {/*  )*/}
          {/*}*/}
        </div>

      </SectionLayout>
  );
}

export default Show;