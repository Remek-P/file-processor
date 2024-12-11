import {useContext} from "react";

import ShowValues from "@/components/output/show-metrics/show-values";

import {DecimalGlobalContext} from "@/context/global-context";

function ShowNumbers({ data, showAllMetrics, showPercentages }) {

  const [decimal] = useContext(DecimalGlobalContext);

  const { value, label } = data;

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
    if (showPercentages === undefined && decimal === undefined) return value;
    // enables toggling between percentage views
    return showPercentages ? `${convertToPercentages}%` : roundToGivenDecimal
  }

  return <ShowValues label={label} displayValue={displayValue()} />
}

export default ShowNumbers;