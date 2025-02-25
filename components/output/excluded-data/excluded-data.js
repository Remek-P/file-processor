import { useContext } from "react";

import {
  ExcludedDataGlobalContext,
  NumberOfOutputsContext,
  ToggleIDViewGlobalContext
} from "@/context/global-context";

import { Tile } from "@carbon/react";
import classes from "@/components/file-chosen/file-chosen.module.scss";
import { thresholdForExcludedData, generalWorker, HEADER_LABEL } from "@/constants/constants";
import useWebWorker from "@/hooks/useGeneralWorker";

function ExcludedData() {

  const [ numberOfOutputs ] = useContext(NumberOfOutputsContext);
  const [ toggleIDView ] = useContext(ToggleIDViewGlobalContext);

  const [ excludedArray, setExcludedArray ] = useContext(ExcludedDataGlobalContext);
  // TODO: haide the Tile component properly, when no data is displayed.
  const excludedArrayLength = toggleIDView ? excludedArray.length : excludedArray.length + 1;
  // if (!isSubheaders && labelArrayLength === excludedArrayLength) setHideTile(true)
  // else setHideTile(false)

  if (!toggleIDView && excludedArray.includes(HEADER_LABEL)) {
    setExcludedArray(prevState => prevState.filter((item) => item !== HEADER_LABEL));
  }

  // hide the hidden array if there are no outputs shown
  const hideHiddenArraysWhenNoUser = numberOfOutputs.length === 0
      ? "hiddenContainerHide" : "hiddenContainerShow";

  const { runTask } = useWebWorker({
    customSetData: setExcludedArray,  // Use custom setData function to update localData
  });

  const removeFromLongExcludedArrayWithWorker = (filter) => {
    const args = [ excludedArray, filter ];
    runTask(generalWorker.filter, args);
  }

  const removeFromShortExcludedArray = (filter) => {
    setExcludedArray(prevState => prevState.filter(item => item.id !== filter));
  }

  const removeFromExcludedArray = (filter) => {
    if (excludedArrayLength > thresholdForExcludedData) removeFromLongExcludedArrayWithWorker(filter);
    else removeFromShortExcludedArray(filter);
  }

  return (
      <ul className={ `${ classes[hideHiddenArraysWhenNoUser] }` }>
        {
          excludedArray.map(data => {
            return (
                <li key={ data.id }>
                  <Tile onClick={ () => removeFromExcludedArray(data.id) }>
                    <span>{ data.value }</span>
                  </Tile>
                </li>
            )
          })
        }
      </ul>
  );
}

export default ExcludedData;