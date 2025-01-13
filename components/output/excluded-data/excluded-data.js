import {useContext, useRef} from "react";

import {ExcludedDataGlobalContext, HideTileContext, NumberOfOutputsContext} from "@/context/global-context";

import { Tile } from "@carbon/react";
import classes from "@/components/file-chosen/file-chosen.module.scss";

function ExcludedData({ labelArrayLength, isSubheaders }) {

  const [ numberOfOutputs ] = useContext(NumberOfOutputsContext);
  const [ , setHideTile ] = useContext(HideTileContext);

  const [excludedArray, setExcludedArray] = useContext(ExcludedDataGlobalContext);

  // TODO: check if the labelArrayLength === excludedArray.length+1 is universal
  if (!isSubheaders && labelArrayLength === excludedArray.length+1) setHideTile(true)
  else setHideTile(false)

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