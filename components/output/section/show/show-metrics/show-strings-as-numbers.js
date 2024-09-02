import { useContext } from "react";

import ShowValues from "@/components/output/section/show/show-metrics/show-values";
import {DecimalGlobalContext} from "@/context/global-context";

function ShowStringsAsNumbers({ data, showAllMetrics, showPercentages  }) {

  const [decimal] = useContext(DecimalGlobalContext);

  const { value, symbolsArray, label } = data;

  const is0 = value === 0;

  if (!showAllMetrics && is0) return null

  const localDecimal = decimal !== undefined
      ? decimal
      : showPercentages === undefined
          ? undefined
          : 2

  const convertToPercentages = (+value * 100).toFixed(localDecimal);
  const roundToGivenDecimal = (+value).toFixed(localDecimal);

  const displayValue = () => {

    let processedValue = value;

    for (const symbol of symbolsArray) {
      if (symbol === "%" || symbol === "p%") {
          if (showPercentages === undefined) processedValue = processedValue+symbol;
          else if (showPercentages) processedValue = processedValue+symbol;
      }
      else if (symbol === "zł") processedValue = processedValue+" "+symbol
      else processedValue = symbol+" "+processedValue
    }

    return processedValue;
  }

  return <ShowValues label={label} displayValue={displayValue()} />
}

export default ShowStringsAsNumbers;