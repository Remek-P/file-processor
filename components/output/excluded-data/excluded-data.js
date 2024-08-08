import { useRef } from "react";

import { Tile } from "@carbon/react";

function ExcludedData({
                        excludedArray,
                        setExcludedArray,
                      }) {

  const excludedValueRef = useRef(null);

  const removeFromExcludedArray = (excludedValueRef) => {
    setExcludedArray(prevState => prevState.filter(value => value !== excludedValueRef.target.textContent))
  }

  return (
      <>
        {
          excludedArray.map((value, index) => {
            return (
                <Tile key={index} onClick={removeFromExcludedArray.bind(excludedValueRef)} ref={excludedValueRef}>
                  <span>{value}</span>
                </Tile>
            )
          })
        }
      </>
  );
}

export default ExcludedData;