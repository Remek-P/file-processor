import {useRef, useState} from "react";

import ShowMetrics from "@/components/output/section/show/show-metrics/show-metrics";
import SectionLayout from "@/components/output/section/section-layout/section-layout";
import ActionToggle from "@/components/output/section/action-toggle/action-toggle";

import {Toggle} from "@carbon/react";


function Show({
                value,
                index,
                headerDataArray,
                labelDataArray,
                colDataArray,
                excludedArray,
                setExcludedArray,
                decimal = 1
              }) {

  const [showAllMetrics, setShowAllMetrics] = useState(false);


  const isNumber = useRef(undefined);

  const valueRef = useRef(null);

  let chartData = [];

  const handleShowAllMetrics = () => {
    setShowAllMetrics(prevState => !prevState)
  };

  const excludeFromDisplaying = () => {
    setExcludedArray([...excludedArray, valueRef.current.value])
  }

  const valueArray = [];

  return (
      <SectionLayout index={index}
                     value={value}
                     chartData={chartData}
                     isNumber={isNumber.current}
                     valueArray={valueArray}
      >

        <div>
          {
            headerDataArray.map((header, index) => {
                  if (header === value) {

                    const checkForString = typeof colDataArray[index] === "string";
                    const cleanValue = checkForString && colDataArray[index].includes("%") ? colDataArray[index].replace("%", "") : colDataArray[index];

                    if (typeof colDataArray[index] === "number") {
                      isNumber.current = true
                    } else if (checkForString) {
                      if (colDataArray[index].includes("%")) {
                        const replaced = +colDataArray[index].replace("%", "");
                        if (!isNaN(replaced)) {
                          isNumber.current = true
                        } else isNumber.current = false;
                      } else isNumber.current = false;
                    } else isNumber.current = false;

                    // Show data not equal to zero
                    if (!showAllMetrics) {
                      if (+cleanValue !== 0) {
                        valueArray.push(isNumber.current)
                        // console.log("Show valueArray", valueArray)
                        // console.log("Show isNumber.current", header, isNumber.current)
                        chartData.push({
                          group: labelDataArray[index],
                          value: +cleanValue
                        });

                        return (
                            <ShowMetrics key={index}
                                         index={index}
                                         colDataArray={colDataArray}
                                         labelDataArray={labelDataArray} />
                        )
                      }
                    } else if (showAllMetrics) {
                      valueArray.push(isNumber.current)
                      // console.log("Show valueArray", valueArray)
                      // console.log("Show isNumber.current", header, isNumber.current)
                      chartData.push({
                        group: labelDataArray[index],
                        value: +cleanValue
                      });

                      return (
                          <ShowMetrics key={index}
                                       index={index}
                                       type="world percentage"
                                       colDataArray={colDataArray}
                                       labelDataArray={labelDataArray} />
                      )
                    }
                  }
                }
            )
          }

          <div>
            
            <ActionToggle onClick={excludeFromDisplaying}
                          description="hide"
                          value={value}
                          valueRef={valueRef}
                          children="X"
            />

            {isNumber.current && <Toggle id={value}
                                         size="sm"
                                         labelA="show all"
                                         labelB="hide 0%"
                                         defaultToggled={false}
                                         onToggle={handleShowAllMetrics}
                                         labelText=""
                                         readOnly={false}
                                         aria-labelledby="show/hide all metrics"
                                         disabled={false}
                                         hideLabel={false}/>
            }
          </div>

        </div>

      </SectionLayout>
  );
}

export default Show;