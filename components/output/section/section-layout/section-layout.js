import { useState } from "react";

import ActionToggle from "@/components/output/section/action-toggle/action-toggle";

import {DonutChart, SimpleBarChart} from "@carbon/charts-react";
import { Tile } from "@carbon/react";

import classes from "../section-module.module.scss";
import '@carbon/charts-react/styles.css'

function SectionLayout({ index,
                         value,
                         chartData,
                         valueArray,
                         showPercentages,
                         setShowPercentages,
                         children,
}) {
  // TODO: what if colData is mixed - number and string

  const [showBarChart, setShowBarChart] = useState(false);
  const [showDonutChart, setShowDonutChart] = useState(false);

  const percentagesIcon = "%";
  const barChartIcon = "bar"
  const donutChartIcon = "donut";

  const percentagesDescription = !showPercentages ? "show" : "hide";
  const barChartDescription = !showBarChart ? "show bar chart" : "hide bar chart";
  const donutChartDescription = !showDonutChart ? "show donut chart" : "hide donut chart";

  const barChartOptions = {
    title: null,
    axes: {
      left: {
        mapsTo: "value"
      },
      bottom: {
        mapsTo: "group",
        scaleType: "labels"
      }
    },
    height: "auto"
  }

  const donutChartOptions = {
    title: null,
    resizable: true,
    legend: {"alignment": "left"},
    donut: {
      center: {
        label: null,
      }
    },
    height: "auto"
  };

  const isNumber = valueArray.some(item => item === true);

  const handleTogglePercentages = () => {
    setShowPercentages(prevState => !prevState)
  };


  const displayBarChart = () => {
    setShowBarChart(prevState => !prevState);
    setShowDonutChart(false);
  };

  const displayDonutChart = () => {
   setShowDonutChart(prevState => !prevState);
    setShowBarChart(false);
  }

  return (
      <Tile className={`optionContainer optionContainer${index} shadow`}>

        <div className={classes.buttonContainer}>
          <h4>{value}</h4>

          {isNumber &&
              <ActionToggle onClick={handleTogglePercentages} description={`${percentagesDescription} percentages`}>
                {percentagesIcon}
              </ActionToggle>}

          {isNumber &&
              <ActionToggle onClick={displayBarChart} description={barChartDescription}>
                {barChartIcon}
              </ActionToggle>}

          {isNumber &&
              <ActionToggle onClick={displayDonutChart} description={donutChartDescription}>
                {donutChartIcon}
              </ActionToggle>}
        </div>

        { children }

        {
            showBarChart && <SimpleBarChart data={chartData} options={barChartOptions}/>
        }
        {
            showDonutChart && <DonutChart data={chartData} options={donutChartOptions}/>
        }
      </Tile>
        );
}

export default SectionLayout;