import { useRef, useContext } from "react";

import {ExcludedDataGlobalContext} from "@/context/global-context";

import ActionToggle from "@/components/output/section/action-toggle/action-toggle";

import { Tile, Toggle } from "@carbon/react";
import { Percentage, DataFormat, ViewOff } from "@carbon/icons-react";

import classes from "@/components/output/output.module.scss";
import '@carbon/charts-react/styles.css'

function SectionLayoutWithoutSubheaders({
                                          value,
                                          dataType,
                                          showPercentages,
                                          setShowPercentages,
                                          numbersEqualToZero,
                                          showAllMetrics,
                                          setShowAllMetrics,
                                          children,
                                        }) {

  // TODO: Delete decimal and setDecimal if needed
// TODO: Tooltip is hidden due to overflow auto, set height to fix?
  const [excludedArray, setExcludedArray] = useContext(ExcludedDataGlobalContext);

  const valueRef = useRef(null);

  const percentagesDescription = "toggle percentages"
  const dataDescription = "Format date";

  const isNumber = dataType.current === "number";
  const isDate = dataType.current === "date";

  const handleTogglePercentages = () => {
    // if (decimal === undefined) setDecimal(2);
    if (showPercentages === undefined) setShowPercentages(true);
    else setShowPercentages(prevState => !prevState)
  };

  const handleFormatDate = () => {
    //TODO: handle the data formatting
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

        {children}

        <div className={classes.toggleContainer}>

          <ActionToggle onClick={excludeFromDisplaying}
                        description="Hide"
                        value={value}
                        valueRef={valueRef}>
            <ViewOff className={classes.iconFill}/>
          </ActionToggle>

          <div className={classes.numberButtons}>
            {isNumber &&
              <ActionToggle onClick={handleTogglePercentages} description={percentagesDescription}>
                <Percentage className={classes.iconFill} aria-label={percentagesDescription}/>
              </ActionToggle>
            }
            {isDate &&
                <ActionToggle onClick={handleFormatDate} description={dataDescription}>
                  <DataFormat className={classes.iconFill} aria-label={dataDescription}/>
                </ActionToggle>
            }
          </div>

          {isNumber && numbersEqualToZero.current
              && <Toggle id={value}
                         size="sm"
                         labelA="Show all"
                         labelB="Hide 0s"
                         defaultToggled={showAllMetrics}
                         onToggle={handleShowAllMetrics}
                         labelText=""
                         readOnly={false}
                         aria-labelledby="show/hide all metrics"
                         disabled={false}
                         hideLabel={false}
                         className={null}
              />
          }
        </div>
      </Tile>
  );
}

export default SectionLayoutWithoutSubheaders;