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
                decimal
              }) {

  const [showAllMetrics, setShowAllMetrics] = useState(false);
  const [showPercentages, setShowPercentages] = useState(false);

  const isNumber = useRef(undefined);
  const valueRef = useRef(null);
  const numbersEqualToZero = useRef(false);

  let chartData = [];

  const handleShowAllMetrics = () => {
    setShowAllMetrics(prevState => !prevState)
  };

  const excludeFromDisplaying = () => {
    setExcludedArray([...excludedArray, valueRef.current.value])
  }

  const valueArray = [];

  const signsArray = ['%', '$', "US$", "USD", "AUD", "A$", "CAD", "C$", '€', "EUR", '¥', "JPY", '£', "GBP", "CNY", "PLN", "zł", ">", ">=", "<", "<="];

  return (
      <SectionLayout index={index}
                     value={value}
                     chartData={chartData}
                     isNumber={isNumber.current}
                     valueArray={valueArray}
                     showPercentages={showPercentages}
                     setShowPercentages={setShowPercentages}
      >

        <div>
          {
            headerDataArray.map((header, index) => {
                  if (header === value) {

                    const checkForString = typeof colDataArray[index] === "string";
                    const checkIfStringContainsArray = checkForString && signsArray.filter(sign => colDataArray[index].includes(sign));

                    let cleanValue;
                    if (checkIfStringContainsArray.length > 0) {
                      for (const sign in checkIfStringContainsArray) {
                        cleanValue = checkForString && colDataArray[index].includes(checkIfStringContainsArray[sign]) ? colDataArray[index].replace(checkIfStringContainsArray[sign], "") : colDataArray[index];
                      }
                    } else cleanValue = colDataArray[index];

                    if (typeof colDataArray[index] === "number") isNumber.current = true
                    else if (checkForString) isNumber.current = !isNaN(+cleanValue);
                    else isNumber.current = false;

                    // Condition to display hide/show 0s toggle
                    if (typeof cleanValue && +cleanValue === 0) numbersEqualToZero.current = true;

                    // Show data not equal to zero
                    if (!showAllMetrics) {
                      if (+cleanValue !== 0) {
                        valueArray.push(isNumber.current) //valueArray is sent as props and used to check if data is number
                        chartData.push({
                          group: labelDataArray[index],
                          value: +cleanValue
                        });

                        return (
                            <ShowMetrics key={index}
                                         index={index}
                                         colDataArray={colDataArray}
                                         labelDataArray={labelDataArray}
                                         showPercentages={showPercentages}
                                         decimal={decimal}
                            />
                        )
                      }
                    } else if (showAllMetrics) {
                      valueArray.push(isNumber.current) //valueArray is sent as props and used to check if data is number
                      chartData.push({
                        group: labelDataArray[index],
                        value: +cleanValue
                      });

                      return (
                          <ShowMetrics key={index}
                                       index={index}
                                       colDataArray={colDataArray}
                                       labelDataArray={labelDataArray}
                                       showPercentages={showPercentages}
                                       decimal={undefined}
                          />
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

            {isNumber.current && numbersEqualToZero.current && <Toggle id={value}
                                         size="sm"
                                         labelA="show all"
                                         labelB="hide 0s"
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