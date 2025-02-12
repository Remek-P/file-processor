import { useRef, useContext } from "react";

import ActionToggle from "@/components/output/action-toggle/action-toggle";

import {ExcludedDataGlobalContext} from "@/context/global-context";

import { Percentage, DataFormat, ViewOff } from "@carbon/react/icons";

import classes from "@/components/output/output.module.scss";
import '@carbon/charts-react/styles.css'

function SectionLayoutWithoutSubheaders({
                                          label,
                                          dataType,
                                          showPercentages,
                                          setShowPercentages,
                                          children,
                                        }) {

  // TODO: Delete decimal and setDecimal if needed
// TODO: Tooltip is hidden due to overflow auto, set height to fix?
  const [excludedArray, setExcludedArray] = useContext(ExcludedDataGlobalContext);

  const valueRef = useRef(null);

  const percentagesDescription = "toggle percentages"
  const dataDescription = "Format date";

  const isNumber = dataType === "number";
  const isDate = dataType === "date";

  const handleTogglePercentages = () => {
    // if (decimal === undefined) setDecimal(2);
    if (showPercentages === undefined) setShowPercentages(true);
    else setShowPercentages(prevState => !prevState)
  };

  const handleFormatDate = () => {
    //TODO: handle the data formatting
  }

  const excludeFromDisplaying = () => {
    setExcludedArray([...excludedArray, valueRef.current.value])
  }

  const isContainingItemFromArray = (item, arr) => {
    return arr.includes(item)
  }

  const hidden = isContainingItemFromArray(label, excludedArray) ? {display: "none"} : null;

  return (
      <div className={classes.optionContainer} style={hidden} aria-hidden={!!hidden}>

        {children}

        <div className={classes.toggleContainer}>

          <ActionToggle onClick={excludeFromDisplaying}
                        description="Hide"
                        value={label}
                        valueRef={valueRef}>
            <ViewOff className={classes.iconFill}/>
          </ActionToggle>

          <div className={classes.numberButtons}>
            {isNumber &&
                <ActionToggle onClick={handleTogglePercentages} description={percentagesDescription}>
                  <Percentage className={classes.iconFill} aria-label={percentagesDescription}/>
                </ActionToggle>}

            {isDate &&
                <ActionToggle onClick={handleFormatDate} description={dataDescription}>
                  <DataFormat className={classes.iconFill} aria-label={dataDescription}/>
                </ActionToggle>}
          </div>

        </div>

      </div>
  );
}

export default SectionLayoutWithoutSubheaders;