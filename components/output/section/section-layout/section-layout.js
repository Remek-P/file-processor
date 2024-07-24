import {useRef, useState} from "react";

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

  const count = useRef(0);

  const percentagesIcon = "%";
  const barChartIcon = "bar"
  const donutChartIcon = "donut";

  const percentagesDescription = !showPercentages ? "show" : "hide";
  const barChartDescription = count.current === 2 ? "show bar chart" : "hide bar chart";
  const donutChartDescription = count.current === 1 ? "show donut chart" : "hide donut chart";

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

  const handleTogglePercentages = () => {
    setShowPercentages(prevState => !prevState)
  };

  const displayBarChart = () => {
    setChartType(<SimpleBarChart data={chartData} options={barChartOptions}/>);
    if (count.current !== 2) {
      setShowChart(prevState => !prevState);
    }
    count.current = 1;
  };

  const displayDonutChart = () => {
    setChartType(<DonutChart data={chartData} options={donutChartOptions}/>);
    if (count.current !== 1) {
      setShowChart(prevState => !prevState);
    }
    count.current = 2;
  }

  return (
      <Tile className={`optionContainer optionContainer${index} shadow`}>

        <div className={classes.buttonContainer}>
          <h4>{value}</h4>

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