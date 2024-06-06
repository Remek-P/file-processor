import { useState } from "react";

import { Toggle } from "@carbon/react";

import ShowMetrics from "@/components/output/section/worlds/show-metrics/show-metrics";
import SectionLayout from "@/components/output/section/section-layout/section-layout";

import classes from "../section-module.module.scss";
import {DonutChart} from "@carbon/charts-react";

function Worlds({ value,
                  index,
                  headerDataArray,
                  labelDataArray,
                  colDataArray,
                  decimal = 1
                }) {

  const [showAllMetrics, setShowAllMetrics] = useState(false);

  let chartData = [];
  const options = {
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
  const handleShowAllMetrics = () => {
    setShowAllMetrics(prevState => !prevState)
  }

  return (
      <SectionLayout index={index}
                     value={value}
                     chartType={<DonutChart data={chartData} options={options}/>}
      >

        <div className={classes.worldsContainer}>
            {
              headerDataArray.map((header, index) => {
                    if (header === value) {

                      if (!showAllMetrics) {
                        if (colDataArray[index]) {
                          chartData.push({
                            group: labelDataArray[index].split(" ")[2],
                            value: +(colDataArray[index] * 100).toFixed(decimal)
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
                          group: labelDataArray[index].split(" ")[2],
                          value: +(colDataArray[index] * 100).toFixed(decimal)
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

            <Toggle id={value}
                    size="sm"
                    labelA="show all"
                    labelB="hide 0%"
                    defaultToggled={false}
                    onToggle={handleShowAllMetrics}
                    labelText=""
                    readOnly={false}
                    aria-labelledby="show/hide all metrics"
                    disabled={false}
                    hideLabel={false}
            />
          </div>

      </SectionLayout>
  );
}

export default Worlds;