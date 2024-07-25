import {useEffect, useRef, useState} from "react";

import ActionToggle from "@/components/output/section/action-toggle/action-toggle";

import {DonutChart, SimpleBarChart} from "@carbon/charts-react";
import { Tile } from "@carbon/react";

import classes from "../section-module.module.scss";

function SectionLayout({ index,
                         value,
                         // chartData,
                         isNumber,
                         barChartIcon,
                         displayBarChart,
                         displayDonutChart,
                         barChartDescription,
                         donutChartDescription,
                         donutChartIcon,
                         children,
}) {
  // TODO: what if colData is mixed - number and string

  // const [showChart, setShowChart] = useState(false);
  const [showPercentages, setShowPercentages] = useState(false);


  // const count = useRef(0);

  const percentagesIcon = "%";
  // const barChartIcon = "bar"
  // const donutChartIcon = "donut";

  const percentagesDescription = !showPercentages ? "show" : "hide";
  // const barChartDescription = count.current === 2 ? "show bar chart" : "hide bar chart";
  // const donutChartDescription = count.current === 1 ? "show donut chart" : "hide donut chart";

  // const barChartOptions = {
  //   "title": null,
  //   "axes": {
  //     "left": {
  //       "mapsTo": "value"
  //     },
  //     "bottom": {
  //       "mapsTo": "group",
  //       "scaleType": "labels"
  //     }
  //   },
  //   "height": "auto"
  // }
  //
  // const donutChartOptions = {
  //   "title": null,
  //   "resizable": true,
  //   "legend": {"alignment": "left"},
  //   "donut": {
  //     "center": {
  //       "label": null
  //     }
  //   },
  //   "height": "auto"
  // };

  // const simpleBarChart = <SimpleBarChart data={chartData} options={barChartOptions}/>;
  // const donutChart = <DonutChart data={chartData} options={donutChartOptions}/>;
  //
  // const [chartType, setChartType] = useState(donutChart);

  const handleTogglePercentages = () => {
    setShowPercentages(prevState => !prevState)
  };

  // const displayBarChart = () => {
  //   setChartType(simpleBarChart);
  //   if (count.current !== 2) {
  //     setShowChart(prevState => !prevState);
  //   }
  //   count.current = 1;
  // };
  //
  // const displayDonutChart = () => {
  //   setChartType(donutChart);
  //   if (count.current !== 1) {
  //     setShowChart(prevState => !prevState);
  //   }
  //   count.current = 2;
  // }

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

        {/*{*/}
        {/*    showChart && chartType*/}
        {/*}*/}
      </Tile>
        );
}

export default SectionLayout;