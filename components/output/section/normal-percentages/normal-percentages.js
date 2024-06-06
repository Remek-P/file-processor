import { DonutChart } from "@carbon/charts-react";

import SectionLayout from "@/components/output/section/section-layout/section-layout";

import "@carbon/charts/styles.css";

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

      </SectionLayout>
  );
}

export default NormalPercentages;