import { DonutChart } from "@carbon/charts-react";

import SectionLayout from "@/components/output/section/section-layout/section-layout";

import "@carbon/charts/styles.css";
import ShowMetrics from "@/components/output/section/worlds/show-metrics/show-metrics";

function NormalPercentages({ value,
                             index,
                             headerDataArray,
                             labelDataArray,
                             colDataArray,
                             decimal = 1
                           }) {

  let chartData = [];
  const options = {
    "title": null,
    "resizable": true,
    "legend": {"alignment": "center"},
    "donut": {
      "center": {
        "label": null
      }
    },
    "height": "auto"
  }


  return (
      <SectionLayout index={index}
                     value={value}
                     chartType={<DonutChart data={chartData} options={options}/>}
      >

          {
            headerDataArray.map((header, index) => {
                  if (header === value) {

                    chartData.push({
                      group: labelDataArray[index],
                      value: +(colDataArray[index] * 100).toFixed(decimal)
                    });
                    return (
                        <ShowMetrics key={index}
                                     index={index}
                                     type="normal percentage"
                                     colDataArray={colDataArray}
                                     labelDataArray={labelDataArray} />
                    )
                  }
                }
            )
          }

      </SectionLayout>
  );
}

export default NormalPercentages;