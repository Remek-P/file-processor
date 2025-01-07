import { useContext } from "react";

import ShowValues from "@/components/output/show-metrics/show-values";

import {DecimalGlobalContext} from "@/context/global-context";

function ShowStringsAsNumbers({ data, showPercentages  }) {

  const [decimal] = useContext(DecimalGlobalContext);

  const { value, symbolsArray, label } = data;

  const localDecimal = decimal !== undefined
      ? decimal
      : showPercentages === undefined
          ? undefined
          : 2

  // const convertToPercentages = (+value * 100).toFixed(localDecimal);
  // const roundToGivenDecimal = (+value).toFixed(localDecimal);

  const displayValue = () => {

    let processedValue = value;
    if (symbolsArray.length === 0 && showPercentages) processedValue = `${processedValue}%`;

    symbolsArray.forEach(symbol => {
      if (symbol === "%" || symbol === "p%") {
        // Add percentage if showPercentages is defined
        if (showPercentages !== undefined && showPercentages) {
          processedValue += symbol;
        }
      } else if (symbol === "zł") {
        processedValue += " " + symbol; // Add space before currency symbol
      } else {
        processedValue = symbol + " " + processedValue; // Prepend other symbols
      }
    });

    return processedValue;
  }

  return <ShowValues label={label} displayValue={displayValue()} />
}

export default ShowStringsAsNumbers;