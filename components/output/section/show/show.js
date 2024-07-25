import {useRef, useState} from "react";

import ShowMetrics from "@/components/output/section/show/show-metrics/show-metrics";
import SectionLayout from "@/components/output/section/section-layout/section-layout";

import {Toggle} from "@carbon/react";
import classes from "../section-module.module.scss";
import ActionToggle from "@/components/output/section/action-toggle/action-toggle";
import {DonutChart, SimpleBarChart} from "@carbon/charts-react";


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
  const [showChart, setShowChart] = useState(false);

  const isNumber = useRef(true);
  const count = useRef(0);

  const valueRef = useRef(null);

  let chartData = [];

  const barChartIcon = "bar"
  const donutChartIcon = "donut";
  const barChartDescription = "bar chart";
  const donutChartDescription = "donut chart";

  const barChartOptions = {
    "title": null,
    "axes": {
      "left": {
        "mapsTo": "value"
      },
      "bottom": {
        "mapsTo": "group",
        "scaleType": "labels"
      }
    },
    "height": "auto"
  }

  const donutChartOptions = {
    "title": null,
    "resizable": true,
    "legend": {"alignment": "left"},
    "donut": {
      "center": {
        "label": null
      }
    },
    "height": "auto"
  };

  const simpleBarChart = <SimpleBarChart data={chartData} options={barChartOptions} />;
  const donutChart = <DonutChart data={chartData} options={donutChartOptions} />;

  const [chartType, setChartType] = useState(donutChart);

  const displayBarChart = () => {
    setChartType(simpleBarChart);
    if (count.current !== 2) {
      setShowChart(prevState => !prevState);
    }
    count.current = 1;
  };

  const displayDonutChart = () => {
    setChartType(donutChart);
    if (count.current !== 1) {
      setShowChart(prevState => !prevState);
    }
    count.current = 2;
  }

  const handleShowAllMetrics = () => {
    setShowAllMetrics(prevState => !prevState)
  };

  const excludeFromDisplaying = () => {
    setExcludedArray([...excludedArray, valueRef.current.value])
  }

  return (
      <SectionLayout index={index}
                     value={value}
                     // chartData={chartData}
                     isNumber={isNumber.current}
                     displayBarChart={displayBarChart}
                     displayDonutChart={displayDonutChart}
                     barChartIcon={barChartIcon}
                     donutChartIcon={donutChartIcon}
                     barChartDescription={barChartDescription}
                     donutChartDescription={donutChartDescription}

      >

        <div>
          {
            headerDataArray.map((header, index) => {
                  if (header === value) {

                    if (typeof colDataArray[index] === "number") isNumber.current = true;
                    if (typeof colDataArray[index] !== "number") isNumber.current = false;

                    const checkForString = typeof colDataArray[index] === "string";
                    const cleanValue = checkForString && colDataArray[index].includes("%") ? colDataArray[index].replace("%", "") : colDataArray[index];

                    // Show data not equal to zero
                    if (!showAllMetrics) {
                      if (+cleanValue !== 0) {
                        chartData.push({
                          group: labelDataArray[index],
                          value: +cleanValue
                        });
                        if (value === "Drivers") console.log("show chartData", chartData)

                        return (
                            <ShowMetrics key={index}
                                         index={index}
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

          <div style={{position: "relative"}}>
            {
                showChart && chartType
            }
          </div>


        </div>

      </SectionLayout>
  );
}

export default Show;