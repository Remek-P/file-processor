import { Tile, Toggle } from "@carbon/react";
import {DonutChart} from "@carbon/charts-react";
import {useState} from "react";

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

  let chartData = []
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
      <Tile className={`container${index} shadow`}>

        <div onDoubleClick={handleShowChart}>
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
                          <div key={index}
                               className={`subContainer subContainer${index}`}>
                            <h6>{labelDataArray[index].split(" ")[2]}</h6>
                            <span>{`${(colDataArray[index] * 100).toFixed(decimal)}%`}</span>
                          </div>
                      )
                    }
                  } else if (showAllMetrics) {
                    chartData.push({
                      group: labelDataArray[index].split(" ")[2],
                      value: +(colDataArray[index] * 100).toFixed(decimal)
                    });

                    return (
                        <div key={index}
                             className={`subContainer subContainer${index}`}>
                          <h6>{labelDataArray[index].split(" ")[2]}</h6>
                          <span>{`${(colDataArray[index] * 100).toFixed(decimal)}%`}</span>
                        </div>
                    )
                  }
                }
              }
          )
        }
      </div>
        {
            showChart && <DonutChart data={chartData} options={options}/>
        }

        <Toggle id={value} onClick={handleShowAllMetrics} size="sm" labelA="show all metrics" labelB="hide marginal metrics"/>

      </Tile>
  );
}

export default Worlds;