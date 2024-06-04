import { useState } from "react";
import { Tile } from "@carbon/react";
import { SimpleBarChart } from "@carbon/charts-react";

function BarChart({ value,
                          index,
                          headerDataArray,
                          labelDataArray,
                          colDataArray,
                        }) {

  const [showChart, setShowChart] = useState(false);
  const handleShowChart = () => {
    setShowChart(prevState => !prevState);
  }

  let chartData = [];
  console.log(chartData)
  const options = {
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
    "height": "400px"
  }

  return (
      <Tile className={`container container${index} shadow`}
            onDoubleClick={handleShowChart}
            style={{cursor: "pointer"}}>

        <h4>{value}</h4>

        {
          headerDataArray.map((header, index) => {
                if (header === value) {
                  chartData.push({
                    group: labelDataArray[index],
                    value: +colDataArray[index]
                  });
                  return (
                      <div key={index}
                           className={`subContainer subContainer${index}`}>
                        <h6>{ labelDataArray[index] }</h6>
                        <span>{ colDataArray[index] }</span>
                      </div>
                  )
                }
              }
          )
        }

        {
            showChart && <SimpleBarChart data={chartData} options={options} />
        }

      </Tile>
  );
}

export default BarChart;