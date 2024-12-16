import {useContext, useRef} from "react";

import { ExcludedDataGlobalContext, NumberOfOutputsContext}  from "@/context/global-context";

import { Tile } from "@carbon/react";
import classes from "@/components/file-chosen/file-chosen.module.scss";

function ExcludedData() {

  const [ numberOfOutputs ] = useContext(NumberOfOutputsContext);

  const [excludedArray, setExcludedArray] = useContext(ExcludedDataGlobalContext);

  const excludedValueRef = useRef(null);

  // hide the hidden array if there are no outputs shown
  const hideHiddenArraysWhenNoUser = numberOfOutputs.length === 0
      ? "hiddenContainerHide" : "hiddenContainerShow";

  const removeFromExcludedArray = (excludedValueRef) => {
    setExcludedArray(prevState => [...prevState].filter(value => value !== excludedValueRef.target.textContent))
  }

  return (
      <ul className={`${classes[hideHiddenArraysWhenNoUser]}`}>
        {
          excludedArray.map((value, index) => {
            return (
                <li key={index} >
                    <Tile onClick={removeFromExcludedArray.bind(excludedValueRef)} ref={excludedValueRef}>
                      <span>{value}</span>
                    </Tile>
                </li>
            )
          })
        }
      </ul>
  );
}

export default ExcludedData;