import { useContext } from "react";

import ActionToggle from "@/components/output/action-toggle/action-toggle";

import { ExcludedDataGlobalContext } from "@/context/global-context";

import { Percentage, DataFormat, ViewOff } from "@carbon/react/icons";

import classes from "@/components/output/output.module.scss";
import '@carbon/charts-react/styles.css'
import { isContainingItemFromArray } from "@/utils/general";

function SectionLayoutWithoutSubheaders({
                                          id,
                                          label,
                                          dataType,
                                          showPercentages,
                                          setShowPercentages,
                                          setShowDateFormat,
                                          children,
                                        }) {

  // TODO: Delete decimal and setDecimal if needed
// TODO: Tooltip is hidden due to overflow auto, set height to fix?
  const [ excludedArray, setExcludedArray ] = useContext(ExcludedDataGlobalContext);

  const percentagesDescription = "toggle percentages"
  const dataDescription = "Format date";

  const isNumber = dataType === "number";
  const isDate = dataType === "date";

  const excludedObject = { id, value: label }

  const handleTogglePercentages = () => {
    // if (decimal === undefined) setDecimal(2);
    if (showPercentages === undefined) setShowPercentages(true);
    else setShowPercentages(prevState => !prevState)
  };

  const handleFormatDate = () => {
    setShowDateFormat(prevState => !prevState);
  }

  const excludeFromDisplaying = () => {
    setExcludedArray([ ...excludedArray, excludedObject ])
  }

  const hidden = isContainingItemFromArray(id, excludedArray);
  const showClass = hidden ? "completely-hidden" : null;

  return (
      <div className={ classes.optionContainer } id={showClass} aria-hidden={ hidden }>

        { children }

        <div className={ classes.toggleContainer }>

          <ActionToggle onClick={ excludeFromDisplaying }
                        description="Hide"
                        value={ label }
          >
            <ViewOff className={ classes.iconFill } />
          </ActionToggle>

          <div className={ classes.numberButtons }>
            { isNumber &&
                <ActionToggle onClick={ handleTogglePercentages } description={ percentagesDescription }>
                  <Percentage className={ classes.iconFill } aria-label={ percentagesDescription } />
                </ActionToggle> }

            { isDate &&
                <ActionToggle onClick={ handleFormatDate } description={ dataDescription }>
                  <DataFormat className={ classes.iconFill } aria-label={ dataDescription } />
                </ActionToggle> }
          </div>

        </div>

      </div>
  );
}

export default SectionLayoutWithoutSubheaders;