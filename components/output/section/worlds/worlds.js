import {useRef, useState} from "react";

import ShowMetrics from "@/components/output/section/worlds/show-metrics/show-metrics";
import SectionLayout from "@/components/output/section/section-layout/section-layout";

import { Toggle } from "@carbon/react";

function Worlds({ value,
                  index,
                  headerDataArray,
                  labelDataArray,
                  colDataArray,
                  decimal = 1
                }) {

  const [showAllMetrics, setShowAllMetrics] = useState(false);
  const isNumber = useRef(null);

  let chartData = [];

  const handleShowAllMetrics = () => {
    setShowAllMetrics(prevState => !prevState)
  };

  return (
      <SectionLayout index={index}
                     value={value}
                     chartData={chartData}
      >

        <div>
            {
              headerDataArray.map((header, index) => {
                    if (header === value) {
                      
                      const checkForString = typeof colDataArray[index] === "string";
                      if (typeof colDataArray[index] === "number") isNumber.current = true;
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

      </SectionLayout>
  );
}

export default Worlds;