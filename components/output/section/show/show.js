import {useRef, useState} from "react";

import ShowMetrics from "@/components/output/section/show/show-metrics/show-metrics";
import SectionLayout from "@/components/output/section/section-layout/section-layout";

import {Toggle} from "@carbon/react";
import classes from "../section-module.module.scss";
import ActionToggle from "@/components/output/section/action-toggle/action-toggle";


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
  const isNumber = useRef(null);

  const valueRef = useRef(null);

  let chartData = [];

  const handleShowAllMetrics = () => {
    setShowAllMetrics(prevState => !prevState)
  };

  const excludeFromDisplaying = () => {
    setExcludedArray([...excludedArray, valueRef.current.value])
  }

  return (
      <SectionLayout index={index}
                     value={value}
                     chartData={chartData}
                     isNumber={isNumber.current}
      >

        <div>
          {
            headerDataArray.map((header, index) => {
                  if (header === value) {

                    const checkForString = typeof colDataArray[index] === "string";
                    if (typeof colDataArray[index] === "number") isNumber.current = true;
                    if (typeof colDataArray[index] !== "number") isNumber.current = false;
                    const cleanValue = checkForString && colDataArray[index].includes("%") ? colDataArray[index].replace("%", "") : colDataArray[index];

                    // Show data not equal to zero
                    if (!showAllMetrics) {
                      if (+cleanValue !== 0) {
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
                    } else if (showAllMetrics) {
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

          <div className={classes.bottomButtonContainer}>
            
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