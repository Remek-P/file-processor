import { useState } from "react";

import ActionToggle from "@/components/output/section/action-toggle/action-toggle";

import {DonutChart, SimpleBarChart} from "@carbon/charts-react";
import { Tile } from "@carbon/react";

import classes from "../section-module.module.scss";

function SectionLayout({ index,
                         value,
                         chartData,
                         children,
}) {

  const [showChart, setShowChart] = useState(false);
  const [showPercentages, setShowPercentages] = useState(false);
  const [chartType, setChartType] = useState(null);

  const buttonIcon = showChart ? "–" : "+";
  const percentagesIcon = "%";
  const barChartIcon = "bar"
  const donutChartIcon = "donut";

  const percentagesDescription = showPercentages ? "show" : "hide";
  const barChartDescription = showPercentages ? "show bar chart" : "hide bar chart";
  const donutChartDescription = showPercentages ? "show donut chart" : "hide donut chart";

  const barChartOptions = {
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

  const donutChartOptions = {
    "title": null,
    "resizable": true,
    "legend": {"alignment": "left"},
    "donut": {
      "center": {
        "label": null
      }
    },
    "height": "auto"
  };

  const handleShowChart = () => {
    setShowChart(prevState => !prevState)
  };
  const handleTogglePercentages = () => {
    setShowPercentages(prevState => !prevState)
  };

  const displayBarChart = () => {
    setChartType(<SimpleBarChart data={chartData} options={barChartOptions}/>)
  };

  const displayDonutChart = () => {
    setChartType(<DonutChart data={chartData} options={donutChartOptions}/>)
  }

  // switch (expr) {
  //   case "bar chart":
  //     setOptions(barChartOptions);
  //     break;
  //   case "donut chart":
  //     setOptions(donutChartOptions);
  //     break;
  //   default:
  //     return null;
  // }

  return (
      <Tile className={`optionContainer optionContainer${index} shadow`}
            onDoubleClick={handleShowChart}
            style={{cursor: "pointer"}}>

        <div className={classes.buttonContainer}>
          <h4>{value}</h4>
          <ActionToggle onClick={handleShowChart} description="toggle chart">
            { buttonIcon }
          </ActionToggle>
          <ActionToggle onClick={handleTogglePercentages} description={`${percentagesDescription} percentages`}>
            { percentagesIcon }
          </ActionToggle>
          <ActionToggle onClick={displayBarChart} description={barChartDescription}>
            { barChartIcon }
          </ActionToggle>
          <ActionToggle onClick={displayDonutChart} description={donutChartDescription}>
            { donutChartIcon }
          </ActionToggle>
        </div>

        { children }

        {
            showChart && chartType
        }
      </Tile>
        );
}

export default SectionLayout;