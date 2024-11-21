import React, {useRef, useState} from 'react';
import {
  checkForNumber,
  checkForString,
  regexOverall,
  separateNumbersAndStrings
} from "@/utils/sortUtils";
import SectionLayoutWithoutSubheaders
  from "@/components/output/section/section-layout/section-layout-without-subheaders/section-layout-without-subheaders";
import ShowNumbers from "@/components/output/section/show/show-metrics/show-numbers";
import ShowStringsAsNumbers from "@/components/output/section/show/show-metrics/show-strings-as-numbers";
import {dateValidator} from "@/utils/dateUtils";
import ShowDate from "@/components/output/section/show/show-metrics/show-date";
import ShowValues from "@/components/output/section/show/show-metrics/show-values";

function ShowDataWithoutSubheaders({
                                     value,
                                     colDataArray,
                                     labelDataArray,
                                   }) {

  const [showAllMetrics, setShowAllMetrics] = useState(true);
  const [showPercentages, setShowPercentages] = useState(undefined);

  const dataType = useRef(undefined);
  const numbersEqualToZero = useRef(false);

  const index = labelDataArray.indexOf(value);
  const data = colDataArray[index];

  if (checkForNumber(data)) {
    if (data === 0) numbersEqualToZero.current = true;
    dataType.current = "number";
    const numberData = {
      value: +data,
      label: labelDataArray[index],
    }

    return (
        <SectionLayoutWithoutSubheaders value={value}
                                        dataType={dataType}
                                        showPercentages={showPercentages}
                                        setShowPercentages={setShowPercentages}
                                        numbersEqualToZero={numbersEqualToZero}
                                        showAllMetrics={showAllMetrics}
                                        setShowAllMetrics={setShowAllMetrics}
        >
          <ShowNumbers key={`${data}+${labelDataArray[index]}`}
                       data={numberData}
                       showAllMetrics={showAllMetrics}
                       showPercentages={showPercentages}
          />
        </SectionLayoutWithoutSubheaders>
    )

  } else if (checkForString(data)) {

    const numberAsString = regexOverall.test(data);

    if (numberAsString) {

      const {numberOnlyData, checkSymbolsInArray} = separateNumbersAndStrings(data);

      if (+numberOnlyData === 0) numbersEqualToZero.current = true;

      dataType.current = "number";
      const numberData = {
        value: +numberOnlyData,
        symbolsArray: checkSymbolsInArray,
        label: labelDataArray[index],
        unrefined: data,
      }

      return (
          <SectionLayoutWithoutSubheaders value={value}
                                          dataType={dataType}
                                          showPercentages={showPercentages}
                                          setShowPercentages={setShowPercentages}
                                          numbersEqualToZero={numbersEqualToZero}
                                          showAllMetrics={showAllMetrics}
                                          setShowAllMetrics={setShowAllMetrics}
          >
            <ShowStringsAsNumbers key={`${data}+${labelDataArray[index]}`}
                                  data={numberData}
                                  showAllMetrics={showAllMetrics}
                                  showPercentages={showPercentages}
            />
          </SectionLayoutWithoutSubheaders>
      )

    } else if (dateValidator(data)) {
      dataType.current = "date";
      // valueArray.push(dataType.current)
      const dateData = {
        value: data,
        label: labelDataArray[index],
      }

      return (
          <SectionLayoutWithoutSubheaders value={value}
                                          dataType={dataType}
                                          showPercentages={showPercentages}
                                          setShowPercentages={setShowPercentages}
                                          numbersEqualToZero={numbersEqualToZero}
                                          showAllMetrics={showAllMetrics}
                                          setShowAllMetrics={setShowAllMetrics}
          >
            <ShowDate key={`${data}+${labelDataArray[index]}`}
                      value={dateData.value}
                      label={dateData.label}
            />
          </SectionLayoutWithoutSubheaders>
      )
    } else {
      dataType.current = "string";
      // valueArray.push(dataType.current)
      const stringData = {
        value: data,
        label: labelDataArray[index],
      };

      return (
          <SectionLayoutWithoutSubheaders value={value}
                                          dataType={dataType}
                                          showPercentages={showPercentages}
                                          setShowPercentages={setShowPercentages}
                                          numbersEqualToZero={numbersEqualToZero}
                                          showAllMetrics={showAllMetrics}
                                          setShowAllMetrics={setShowAllMetrics}
          >
            <ShowValues key={`${data}+${labelDataArray[index]}`}
                        label={stringData.label}
                        displayValue={stringData.value}
            />
          </SectionLayoutWithoutSubheaders>
      )
    }

  } else {
    dataType.current = "other";
    const otherData = {
      value: data,
      label: labelDataArray[index],
    };

    return (
        <SectionLayoutWithoutSubheaders value={value}
                                        dataType={dataType}
                                        showPercentages={showPercentages}
                                        setShowPercentages={setShowPercentages}
                                        numbersEqualToZero={numbersEqualToZero}
                                        showAllMetrics={showAllMetrics}
                                        setShowAllMetrics={setShowAllMetrics}
        >
          <ShowValues key={`${data}+${labelDataArray[index]}`}
                      label={otherData.label}
                      displayValue={otherData.value}
          />
        </SectionLayoutWithoutSubheaders>
    )
  }
}

export default ShowDataWithoutSubheaders;