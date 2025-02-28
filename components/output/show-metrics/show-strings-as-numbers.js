import { useContext, useMemo } from "react";

import ShowValues from "@/components/output/show-metrics/show-values";

import { DecimalGlobalContext } from "@/context/global-context";

function ShowStringsAsNumbers({ data, showPercentages }) {

  const [ decimal ] = useContext(DecimalGlobalContext);

  const { value, symbolsArray, label } = data;

  const checkForSymbols = () => {

    const localDecimal = decimal !== undefined
        ? decimal
        : 2

    const roundToGivenDecimal = () => (value).toFixed(localDecimal);

    let processedValue = decimal === undefined ? value : roundToGivenDecimal();
    if (symbolsArray.length === 0 && showPercentages) return processedValue = `${ processedValue }%`;

    symbolsArray.forEach(symbol => {
      if (symbol === "%" || symbol === "p%") {
        // Add percentage if showPercentages is defined
        if (showPercentages !== false) {
          processedValue = processedValue + symbol;
        } else if (showPercentages === false) {
          processedValue = processedValue / 100;
        }
      } else if (symbol === "‰") {
        processedValue = processedValue + " " + symbol;
      } else if (symbol === "zł") {
        processedValue += " " + symbol; // Add space before currency symbol
      } else {
        processedValue = symbol + " " + processedValue; // Prepend other symbols
      }
    });

    return processedValue;
  }

  const finalValue = useMemo(() => checkForSymbols(), [ value, showPercentages ]);

  return <ShowValues label={ label } displayValue={ finalValue } />
}

export default ShowStringsAsNumbers;