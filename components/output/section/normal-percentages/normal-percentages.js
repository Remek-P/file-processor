import { DonutChart } from "@carbon/charts-react";

import SectionLayout from "@/components/output/section/section-layout/section-layout";

import "@carbon/charts/styles.css";
import ShowMetrics from "@/components/output/section/worlds/show-metrics/show-metrics";

function NormalPercentages({ value,
                             index,
                             headerDataArray,
                             labelDataArray,
                             colDataArray,
                             decimal = 2
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

                    const checkForString = typeof colDataArray[index] === "string"
                    const cleanValue = checkForString && colDataArray[index].includes("%") ? colDataArray[index].replace("%", "") : colDataArray[index];

                    chartData.push({
                      group: labelDataArray[index],
                      value: +cleanValue
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