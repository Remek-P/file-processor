import {useContext, useRef} from "react";

import {
  ExcludedDataGlobalContext,
  HideTileContext,
  NumberOfOutputsContext,
  ToggleIDViewGlobalContext
} from "@/context/global-context";

import { Tile } from "@carbon/react";
import classes from "@/components/file-chosen/file-chosen.module.scss";
import {thresholdForExcludedData, generalWorker, HEADER_LABEL} from "@/constants/constants";
import useWebWorker from "@/hooks/useGeneralWorker";

function ExcludedData({ labelArrayLength, isSubheaders }) {

  const [ numberOfOutputs ] = useContext(NumberOfOutputsContext);
  const [ , setHideTile ] = useContext(HideTileContext);
  const [ toggleIDView  ] = useContext(ToggleIDViewGlobalContext);

  const [excludedArray, setExcludedArray] = useContext(ExcludedDataGlobalContext);
  // TODO: haide the Tile component properly, when no data is displayed.
  const excludedArrayLength = toggleIDView ? excludedArray.length : excludedArray.length + 1;
  // if (!isSubheaders && labelArrayLength === excludedArrayLength) setHideTile(true)
  // else setHideTile(false)


  if (!toggleIDView && excludedArray.includes(HEADER_LABEL)) {
    setExcludedArray(prevState => prevState.filter((item) => item !== HEADER_LABEL));
  }

  const excludedValueRef = useRef(null);

  // hide the hidden array if there are no outputs shown
  const hideHiddenArraysWhenNoUser = numberOfOutputs.length === 0
      ? "hiddenContainerHide" : "hiddenContainerShow";

  const { runTask } = useWebWorker({
    customSetData: setExcludedArray,  // Use custom setData function to update localData
  });

  const removeFromLongExcludedArrayWithWorker = (excludedValueRef) => {
    const toFilter = excludedValueRef.target.textContent;
    const args = [excludedArray, toFilter];
    runTask(generalWorker.filter, args);
  }

  const removeFromShortExcludedArray = (excludedValueRef) => {
    setExcludedArray(prevState => prevState.filter(item => item !== excludedValueRef.target.textContent));
  }

  const removeFromExcludedArray = (excludedValueRef) => {
    if (excludedArrayLength > thresholdForExcludedData) removeFromLongExcludedArrayWithWorker(excludedValueRef);
    else removeFromShortExcludedArray(excludedValueRef);
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