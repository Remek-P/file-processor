import { SimpleBarChart } from "@carbon/charts-react";

import SectionLayout from "@/components/output/section/section-layout/section-layout";
import ShowMetrics from "@/components/output/section/worlds/show-metrics/show-metrics";

function BarChart({ value,
                          index,
                          headerDataArray,
                          labelDataArray,
                          colDataArray,
                        }) {

  let chartData = [];
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
    "height": "auto"
  }

  return (
      <SectionLayout index={index}
                     value={value}
                     chartType={<SimpleBarChart data={chartData} options={options}/>}
      >

        {
          headerDataArray.map((header, index) => {
                if (header === value) {
                  chartData.push({
                    group: labelDataArray[index],
                    value: +colDataArray[index]
                  });
                  return (
                      <ShowMetrics type="bar chart percentage"
                                   index={index}
                                   colDataArray={chartData}
                                   labelDataArray={labelDataArray} />
                  )
                }
              }
          )
        }

      </SectionLayout>
  );
}

export default BarChart;