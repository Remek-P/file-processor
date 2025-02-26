import { useContext, useRef } from "react";

import ShowValues from "@/components/output/show-metrics/show-values";

import { DecimalGlobalContext } from "@/context/global-context";

function ShowNumbers({ data, showPercentages }) {

  const [ decimal ] = useContext(DecimalGlobalContext);

  const { value, label } = data;

  const localDecimal = decimal !== undefined
      ? decimal
      : showPercentages === undefined
          ? undefined
          : 2

  const toPercentages = () => (+value * 100).toFixed(localDecimal)
  const roundToGivenDecimal = () => (+value).toFixed(localDecimal);

  const displayValue = () => {
    if (showPercentages === undefined && decimal === undefined) return value;
    // enables toggling between percentage views
    return showPercentages ? `${ toPercentages() }%` : roundToGivenDecimal()
  }

  return <ShowValues label={ label } displayValue={ displayValue() }/>
}

export default ShowNumbers;