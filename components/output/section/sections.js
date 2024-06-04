import Rest from "@/components/output/section/rest/rest";
import TexTile from "@/components/output/section/text-tile/texTile";

import classes from "./section-module.module.scss";
import NormalPercentages from "@/components/output/section/normal-percentages/normal-percentages";
import Worlds from "@/components/output/section/worlds/worlds";
import Person from "@/components/output/section/person/person";
import BarChart from "@/components/output/section/bar-chart/bar-chart";

function Sections({ excelFile, inputValue, handleClick }) {

  const excelFileUniqueValues = [... new Set(excelFile[0])];

  const headerDataArray = excelFile[0];
  const labelDataArray = excelFile[1];

  const searchedPerson = excelFile.filter((arr) => {
    if (arr[1].toString().toLowerCase().includes(inputValue)) return arr
  });
  const colDataArray = searchedPerson[0]?.map(datum => datum);

  const normalPercentageFactorsArr = ["memorizing", "stage", "temperament"];
  const simpleBarChartArr = ["drivers"];

  const extractFirstWord = (item) => {
    return item.toLowerCase().split(" ")[0];
  }

  const isContainingItemFromArray = (item, arr) => {
    return arr.includes(extractFirstWord(item))
  }

  const showDataWhenUserIsChosen = () => {
    return excelFileUniqueValues.map((value, index) => {

      if (value.toLowerCase().includes("birth"))
        return null

      else if (value.toLowerCase() === "human")
        return <Person key={value}
                   colDataArray={colDataArray}
                   labelDataArray={labelDataArray}
                   index={index} />

      else if (value.toLowerCase() === "worlds")
        return <Worlds key={value}
                       index={index}
                       value={value}
                       colDataArray={colDataArray}
                       labelDataArray={labelDataArray}
                       headerDataArray={headerDataArray} />

      else if (isContainingItemFromArray(value, normalPercentageFactorsArr))
        return <NormalPercentages key={value}
                                  value={value}
                                  index={index}
                                  colDataArray={colDataArray}
                                  labelDataArray={labelDataArray}
                                  headerDataArray={headerDataArray} />

      else if (isContainingItemFromArray(value, simpleBarChartArr))
        return <BarChart key={value}
                               index={index}
                               value={value}
                               colDataArray={colDataArray}
                               labelDataArray={labelDataArray}
                               headerDataArray={headerDataArray} />

      else
        // in case new data appears
        return <Rest key={value}
                     colDataArray={colDataArray}
                     labelDataArray={labelDataArray} index={index}
                     value={value}
                     headerDataArray={headerDataArray} />
    })
  }

  const displayData = () => {

    if (searchedPerson.length > 1)
      return <TexTile text="Please find the user by ID" handleClick={handleClick} />

    else if (searchedPerson.length === 1)
      return showDataWhenUserIsChosen();

    else
      return <TexTile text="No such user exists" handleClick={handleClick} />
  }

  return (
      <div className={classes.grid}>
        {
          displayData()
        }
      </div>
  );
}

export default Sections;