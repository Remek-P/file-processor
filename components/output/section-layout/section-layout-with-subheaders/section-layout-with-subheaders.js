import { useState, useRef, useContext, useMemo } from "react";

import { ExcludedDataGlobalContext } from "@/context/global-context";

import ActionToggle from "@/components/output/action-toggle/action-toggle";

import { DonutChart, SimpleBarChart } from "@carbon/charts-react";
import { Tile, Toggle } from "@carbon/react";
import {
  ChartBar,
  ChartRing,
  Percentage,
  SortAscending,
  SortDescending,
  DataFormat,
  ViewOff
} from "@carbon/react/icons";

import classes from "@/components/output/output.module.scss";
import '@carbon/charts-react/styles.css'
import { isContainingItemFromArray } from "@/utils/general";

function SectionLayoutWithSubheaders({
                                       id,
                                       value,
                                       sort,
                                       setSort,
                                       chartData,
                                       valueTypeArray,
                                       showPercentages,
                                       setShowPercentages,
                                       numbersEqualToZero,
                                       showAllMetrics,
                                       setShowAllMetrics,
                                       setShowDateFormat,
                                       children,
                                     }) {

  // TODO: Delete decimal and setDecimal if needed
// TODO: Tooltip is hidden due to overflow auto, set height to fix?
  const [ excludedArray, setExcludedArray ] = useContext(ExcludedDataGlobalContext);

  const [ showBarChart, setShowBarChart ] = useState(false);
  const [ showDonutChart, setShowDonutChart ] = useState(false);

  const valueRef = useRef(null);

  const percentagesDescription = "toggle percentages"
  const barChartDescription = showBarChart ? "hide bar chart" : "show bar chart";
  const donutChartDescription = showDonutChart ? "hide donut chart" : "show donut chart";
  const dataDescription = "Format date";

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
    legend: { "alignment": "left" },
    donut: {
      center: {
        label: null,
      }
    },
    height: "auto"
  };

  const isNumber = useMemo(() => valueTypeArray.some(item => item === "number"), [ valueTypeArray ]);
  const isDate = useMemo(() => valueTypeArray.some(item => item === "date"), [ valueTypeArray ]);
  // TODO: This can cause problems when data is both number and date in one group;

  const excludedObject = { id, value }

  const sortValues = () => {
    setSort(prevState => !prevState);
  }

  const handleTogglePercentages = () => {
    // if (decimal === undefined) setDecimal(2);
    if (showPercentages === undefined) setShowPercentages(true);
    else setShowPercentages(prevState => !prevState)
  };

  const handleFormatDate = () => {
    setShowDateFormat(prevState => !prevState);
  }

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
    setExcludedArray([ ...excludedArray, excludedObject ])
  }

  const hidden = isContainingItemFromArray(id, excludedArray);
  const showClass = hidden ? "completely-hidden" : null;

  return (
      <Tile className={ `${ classes.optionContainer } shadow` } id={ showClass } aria-hidden={ hidden }>

        <div className={ classes.topSection }>
          <h4>{ value }</h4>
          <div className={ classes.numberButtons }>

            <ActionToggle onClick={ sortValues } description={ !sort ? "Sort Ascending" : "Sort Descending" }>
              { !sort
                  ? <SortAscending className={ classes.iconFill } aria-label="Sort Ascending"/>
                  : <SortDescending className={ classes.iconFill } aria-label="Sort Descending"/> }
            </ActionToggle>

            { isNumber && <>
              <ActionToggle onClick={ handleTogglePercentages } description={ percentagesDescription }>
                <Percentage className={ classes.iconFill } aria-label={ percentagesDescription }/>
              </ActionToggle>


              <ActionToggle onClick={ displayBarChart } description={ barChartDescription }>
                <ChartBar className={ classes.iconFill } aria-label={ barChartDescription }/>
              </ActionToggle>


              <ActionToggle onClick={ displayDonutChart } description={ donutChartDescription }>
                <ChartRing className={ classes.iconFill } aria-label={ donutChartDescription }/>
              </ActionToggle>
            </>
            }

            { isDate &&
                <>
                  <ActionToggle onClick={ handleFormatDate } description={ dataDescription }>
                    <DataFormat className={ classes.iconFill } aria-label={ dataDescription }/>
                  </ActionToggle>
                </>
            }

          </div>
        </div>

        { children }

        <div className={ classes.toggleContainer }>

          <ActionToggle onClick={ excludeFromDisplaying }
                        description="Hide"
                        value={ value }
                        valueRef={ valueRef }>
            <ViewOff className={ classes.iconFill }/>
          </ActionToggle>

          { isNumber && numbersEqualToZero.current
              && <Toggle id={ value }
                         size="sm"
                         labelA="Show all"
                         labelB="Hide 0s"
                         defaultToggled={ showAllMetrics }
                         onToggle={ handleShowAllMetrics }
                         labelText=""
                         readOnly={ false }
                         aria-labelledby="show/hide all metrics"
                         disabled={ false }
                         hideLabel={ false }
                         className={ classes.zeroToggle }
              />
          }
        </div>

        { showBarChart &&
            <SimpleBarChart data={ chartData } options={ barChartOptions }/>
        }

        { showDonutChart &&
            <DonutChart data={ chartData } options={ donutChartOptions }/>
        }

      </Tile>
  );
}

export default SectionLayoutWithSubheaders;