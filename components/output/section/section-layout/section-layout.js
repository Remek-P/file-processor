import { useState, useRef } from "react";

import ActionToggle from "@/components/output/section/action-toggle/action-toggle";

import { DonutChart, SimpleBarChart } from "@carbon/charts-react";
import { Tile, Toggle } from "@carbon/react";
import {ChartBar, ChartRing, CloseLarge, Percentage, SortAscending, SortDescending} from "@carbon/icons-react";

import classes from "@/components/output/output.module.scss";
import '@carbon/charts-react/styles.css'

function SectionLayout({
                         value,
                         sort,
                         setSort,
                         chartData,
                         valueArray,
                         showPercentages,
                         setShowPercentages,
                         excludedArray,
                         setExcludedArray,
                         numbersEqualToZero,
                         setShowAllMetrics,
                         children,
                       }) {
  // TODO: what if colData is mixed - number and string
  // TODO: Delete decimal and setDecimal if needed

  const [showBarChart, setShowBarChart] = useState(false);
  const [showDonutChart, setShowDonutChart] = useState(false);

  const valueRef = useRef(null);

  const percentagesDescription = "toggle percentages"
  const barChartDescription = showBarChart ? "hide bar chart" : "show bar chart";
  const donutChartDescription = showDonutChart ? "hide donut chart" : "show donut chart";

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

  const sortValues = () => {
    setSort(prevState => !prevState);
  }

  const handleTogglePercentages = () => {
    // if (decimal === undefined) setDecimal(2);
    if (showPercentages === undefined) setShowPercentages(true);
    else setShowPercentages(prevState => !prevState)

  };

  const displayBarChart = () => {
    setShowBarChart(prevState => !prevState);
    setShowDonutChart(false);
  };

  const displayDonutChart = () => {
   setShowDonutChart(prevState => !prevState);
    setShowBarChart(false);
  }

  const handleShowAllMetrics = () => {
      setShowAllMetrics(prevState => !prevState)
    };

  const excludeFromDisplaying = () => {
    setExcludedArray([...excludedArray, valueRef.current.value])
  }

  const isContainingItemFromArray = (item, arr) => {
    return arr.includes(item)
  }

  const hidden = isContainingItemFromArray(value, excludedArray) ? {display: "none"} : null;
  
  return (
      <Tile className={`${classes.optionContainer} shadow`} style={hidden} aria-hidden={!!hidden}>

        <div className={classes.topSection}>
          <h4>{value}</h4>
          <div className={classes.numberButtons}>
            <ActionToggle onClick={sortValues} description={!sort ? "Sort Ascending" : "Sort Descending"}>
              {!sort
                  ? <SortAscending className={classes.iconFill} aria-label="Sort Ascending" />
                  : <SortDescending className={classes.iconFill} aria-label="Sort Descending" />}
            </ActionToggle>
            {isNumber &&
                <ActionToggle onClick={handleTogglePercentages} description={percentagesDescription}>
                  <Percentage className={classes.iconFill} aria-label={percentagesDescription} />
                </ActionToggle>}

            {isNumber &&
                <ActionToggle onClick={displayBarChart} description={barChartDescription}>
                  <ChartBar className={classes.iconFill} aria-label={barChartDescription}/>
                </ActionToggle>}

            {isNumber &&
                <ActionToggle onClick={displayDonutChart} description={donutChartDescription}>
                  <ChartRing className={classes.iconFill} aria-label={donutChartDescription} />
                </ActionToggle>}
          </div>
        </div>

        {children}

        <div className={classes.toggleContainer}>

          <ActionToggle onClick={excludeFromDisplaying}
                        description="Hide"
                        value={value}
                        valueRef={valueRef}>
            <CloseLarge className={classes.iconFill}/>
          </ActionToggle>

          {isNumber && numbersEqualToZero.current && <Toggle id={value}
                                                                     size="sm"
                                                                     labelA="Show all"
                                                                     labelB="Hide 0s"
                                                                     defaultToggled={false}
                                                                     onToggle={handleShowAllMetrics}
                                                                     labelText=""
                                                                     readOnly={false}
                                                                     aria-labelledby="show/hide all metrics"
                                                                     disabled={false}
                                                                     hideLabel={false}/>
          }
        </div>

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