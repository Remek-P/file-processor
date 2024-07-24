import Person from "@/components/output/section/person/person";
import Worlds from "@/components/output/section/worlds/worlds";
import NormalPercentages from "@/components/output/section/normal-percentages/normal-percentages";
import BarChart from "@/components/output/section/bar-chart/bar-chart";
import Rest from "@/components/output/section/rest/rest";

function DisplaySingleOutput({ excelFile, colDataArray, labelDataArray }) {

  const excelFileUniqueValues = [... new Set(excelFile[0])];

  const headerDataArray = excelFile[0];

  // const normalPercentageFactorsArr = ["memorizing", "stage", "temperament"];
  // const simpleBarChartArr = [];
  // const personArray = ["human"];
  // const worldsLikeArray = ["worlds"];
  // const excludedArray = ["birth", "birthday_day", "birthday_daymonth", "birthday_month", "birthday_year"];

  // const extractFirstWord = (item) => {
  //   return item.toLowerCase().split(" ")[0];
  // }
  //
  // const isContainingItemFromArray = (item, arr) => {
  //   return arr.includes(extractFirstWord(item))
  // }

  return (
      <>
        {
          excelFileUniqueValues.map((value, index) => {

            // if (isContainingItemFromArray(value, excludedArray))
            //   return null
            //
            // else if (isContainingItemFromArray(value, personArray))
            //   return <Person key={value}
            //                  colDataArray={colDataArray}
            //                  labelDataArray={labelDataArray}
            //                  index={index}/>
            //
            // else if (isContainingItemFromArray(value, worldsLikeArray))
              return <Worlds key={value}
                             index={index}
                             value={value}
                             colDataArray={colDataArray}
                             labelDataArray={labelDataArray}
                             headerDataArray={headerDataArray} />
            //
            // else if (isContainingItemFromArray(value, normalPercentageFactorsArr))
            //   return <NormalPercentages key={value}
            //                             value={value}
            //                             index={index}
            //                             colDataArray={colDataArray}
            //                             labelDataArray={labelDataArray}
            //                             headerDataArray={headerDataArray} />
            //
            // else if (isContainingItemFromArray(value, simpleBarChartArr))
            //   return <BarChart key={value}
            //                    index={index}
            //                    value={value}
            //                    colDataArray={colDataArray}
            //                    labelDataArray={labelDataArray}
            //                    headerDataArray={headerDataArray}/>
            //
            // else
                // in case new data appears
              // return <Rest key={value}
              //              value={value}
              //              colDataArray={colDataArray}
              //              labelDataArray={labelDataArray} index={index}
              //              headerDataArray={headerDataArray} />
          })
        }
      </>
  );
}

export default DisplaySingleOutput;