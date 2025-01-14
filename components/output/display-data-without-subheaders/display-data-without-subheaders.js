import {useContext, useMemo, useState} from 'react';

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

import {ShowAllMetricsContext, ToggleIDViewGlobalContext} from "@/context/global-context";
import {
  checkForNumber,
  checkForString,
  decimalPlaceSeparatorToComma
} from "@/utils/general";

import { HEADER_LABEL } from "@/constants/constants";

function DisplayDataWithoutSubheaders({
                                        value,
                                        index,
                                        labelDataArray,
                                        hideDB_ID_Tile,
                                   }) {

  const [ showAllMetrics ] = useContext(ShowAllMetricsContext);
  const [ toggleIDView ] = useContext(ToggleIDViewGlobalContext);

  const [ showPercentages, setShowPercentages ] = useState(undefined);

  if (!hideDB_ID_Tile && !toggleIDView && labelDataArray[index] === HEADER_LABEL) return null

  let isZero;
  let dataType;
  const number = "number";
  const string = "string";
  const date = "date";
  const numberAsAString = "number as string";
  const dateAsAString = "date as string";
  const other = "other";

  const stringTest = (data) => {
    const isStringANumber = regexOverall.test(data);
    const isStringADate = dateValidator(value);
    if (isStringANumber) return numberAsAString
    else if (isStringADate) return dateAsAString
    else return string
  }

  const dataTypeTest = useMemo(() => (data) => {
    if (checkForNumber(data)) return number
    else if (checkForString(data)) return stringTest(data)
    else return other
  }, [value]);

  let displayData;

  switch (dataTypeTest(value)) {
    case number: {
      if (value === 0) isZero = true;
      dataType = number;
      const numberData = {
        value: +value,
        label: labelDataArray[index],
      }
      displayData = <ShowNumbers key={`${value}+${labelDataArray[index]}`}
                                 data={numberData}
                                 showPercentages={showPercentages}
      />
      break;
    }

    case string: {
      dataType = string;
      const stringData = {
        value: value,
        label: labelDataArray[index],
      };
      displayData = <ShowValues key={`${value}+${labelDataArray[index]}`}
                                label={stringData.label}
                                displayValue={stringData.value}
      />
      break;
    }

    case numberAsAString: {
      dataType = number;
      const refinedValue = decimalPlaceSeparatorToComma(value);
      const { numberOnlyData, checkSymbolsInArray } = separateNumbersAndStrings(refinedValue);

      if (numberOnlyData === 0) isZero = true;

      const numberData = {
        value: numberOnlyData,
        symbolsArray: checkSymbolsInArray,
        label: labelDataArray[index],
        unrefined: value,
      }

      displayData = <ShowStringsAsNumbers key={`${value}+${labelDataArray[index]}`}
                                          data={numberData}
                                          showPercentages={showPercentages}
      />
      break
    }

    case dateAsAString: {
      dataType = date;
      const dateData = {
        value: value,
        label: labelDataArray[index],
      }

      displayData = <ShowDate key={`${value}+${labelDataArray[index]}`}
                              value={dateData.value}
                              label={dateData.label}
      />
    break;
    }

    case other: {
      dataType = other;
      const otherData = {
        value: value,
        label: labelDataArray[index],
      };

      displayData = <ShowValues key={`${value}+${labelDataArray[index]}`}
                                label={otherData.label}
                                displayValue={otherData.value}
      />
      break;
    }
  }

  if (isZero && !showAllMetrics) return null;

  return (
      <SectionLayoutWithoutSubheaders dataType={dataType}
                                      showPercentages={showPercentages}
                                      setShowPercentages={setShowPercentages}
                                      label={labelDataArray[index]}
      >
        {displayData}
      </SectionLayoutWithoutSubheaders>
  )
}

export default DisplayDataWithoutSubheaders;