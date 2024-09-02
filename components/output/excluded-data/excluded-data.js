import {useContext, useRef} from "react";

import {ExcludedDataGlobalContext} from "@/context/global-context";

import { Tile } from "@carbon/react";

function ExcludedData() {

  const [excludedArray, setExcludedArray] = useContext(ExcludedDataGlobalContext);

  const excludedValueRef = useRef(null);

  const removeFromExcludedArray = (excludedValueRef) => {
    setExcludedArray(prevState => prevState.filter(value => value !== excludedValueRef.target.textContent))
  }

  return (
      <>
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
      </>
  );
}

export default ExcludedData;