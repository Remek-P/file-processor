import { SimpleBarChart } from "@carbon/charts-react";

import SectionLayout from "@/components/output/section/section-layout/section-layout";

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
                      <div key={index}
                           className={`subContainer subContainer${index}`}>
                        <h6>{labelDataArray[index]}</h6>
                        <span>{colDataArray[index]}</span>
                      </div>
                  )
                }
              }
          )
        }

      </SectionLayout>
  );
}

export default BarChart;