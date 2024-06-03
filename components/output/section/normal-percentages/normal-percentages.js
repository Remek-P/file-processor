import { Tile } from "@carbon/react";
import { DonutChart } from "@carbon/charts-react";
import { useState } from "react";
import "@carbon/charts/styles.css";

function NormalPercentages({ value,
                             index,
                             headerDataArray,
                             labelDataArray,
                             colDataArray,
                             decimal = 1
                           }) {

  const [showChart, setShowChart] = useState(false);

  let chartData = []
  const options = {
    "title": null,
    "resizable": true,
    "legend": {"alignment": "center"},
    "donut": {
      "center": {
        "label": null
      }
    },
    "height": "400px"
  }

  const handleShowChart = () => {
    setShowChart(prevState => !prevState);
  }

  return (
      <Tile className={`container${index} shadow`}
            onDoubleClick={handleShowChart}
            style={{cursor: "pointer"}}>

          <h4>{value}</h4>

          {
            headerDataArray.map((header, index) => {
                  if (header === value) {

                    chartData.push({
                      group: labelDataArray[index],
                      value: +(colDataArray[index] * 100).toFixed(decimal)
                    });
                    return (
                          <div key={index}
                               className={`subContainer subContainer${index}`}>
                            <h6>{ labelDataArray[index] }</h6>
                            <span>{ `${(colDataArray[index] * 100).toFixed(decimal)}%` }</span>
                          </div>
                    )
                  }
                }
            )
          }

        {
          showChart && <DonutChart data={chartData} options={options} />
        }

      </Tile>
  );
}

export default NormalPercentages;