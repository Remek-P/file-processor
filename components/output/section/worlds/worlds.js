import { Tile, Toggle } from "@carbon/react";
import { DonutChart } from "@carbon/charts-react";
import { useState } from "react";
import ShowMetrics from "@/components/output/section/worlds/show-metrics/show-metrics";

function Worlds({ value,
                  index,
                  headerDataArray,
                  labelDataArray,
                  colDataArray,
                  decimal = 1
                }) {

  const [showChart, setShowChart] = useState(false);
  const [showAllMetrics, setShowAllMetrics] = useState(false);

  const handleShowChart = () => {
    setShowChart(prevState => !prevState)
  }
  const handleShowAllMetrics = () => {
    setShowAllMetrics(prevState => !prevState)
  }

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
    "height": "400px"
  }

  return (
      <Tile className={`container${index} shadow`}
            onDoubleClick={handleShowChart}
            style={{cursor: "pointer"}}>

        <h4>{value}</h4>

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
                          <ShowMetrics key={index} labelDataArray={labelDataArray}
                                       colDataArray={colDataArray}
                                       index={index} />
                      )
                    }
                  } else if (showAllMetrics) {
                    chartData.push({
                      group: labelDataArray[index].split(" ")[2],
                      value: +(colDataArray[index] * 100).toFixed(decimal)
                    });

                    return (
                        <ShowMetrics key={index} labelDataArray={labelDataArray}
                                     colDataArray={colDataArray}
                                     index={index} />
                    )
                  }
                }
              }
          )
        }

        {
            showChart && <DonutChart data={chartData} options={options}/>
        }

        <Toggle id={value} onClick={handleShowAllMetrics} size="sm" labelA="show all metrics" labelB="hide marginal metrics"/>

      </Tile>
  );
}

export default Worlds;