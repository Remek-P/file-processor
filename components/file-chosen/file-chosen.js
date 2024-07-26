import { useState } from "react";

import {OverflowMenu, MenuItem, MenuItemDivider, NumberInput} from "@carbon/react";

import DisplayOutput from "@/components/choose-file-screen/displayOutput/displayOutput";

import classes from "./file-chosen.module.scss";

function FileChosen({
                      handleFileChange,
                      excelFile,
}) {

  const [numberOfOutputs, setNumberOfOutputs] = useState([{delete: false}]);
  const [decimal, setDecimal] = useState(2);

  const addPerson = () => {
    setNumberOfOutputs(prevState => [...prevState, {delete: false}])
  }

  const deleteAll = () => {
    setNumberOfOutputs([])
  }
  // TODO: decimal manipulation is not working
  // const handleDecimalInputChange = (event, { value, direction }) => {
  //   if (direction === "down") {
  //     setDecimal(prevState => prevState--)
  //   }
  //   if (direction === "up") {
  //     setDecimal(prevState => prevState++)
  //   }
  //   if (!direction) {
  //     setDecimal(value)
  //   }
  // }

  return (
      <section className={classes.sectionContainer}>

        <div className={`${classes.menuContainer} shadow`}>
          <OverflowMenu className={classes.menu}
                        aria-label="actions menu"
                        flipped={true}
          >
            {/*<MenuItemDivider />*/}
            {/*<NumberInput value={decimal}*/}
            {/*             min={0}*/}
            {/*             onChange={handleDecimalInputChange}*/}
            {/*             iconDescription="increase decrease"*/}
            {/*             label="Increrase or decrease decimal place"*/}
            {/*             invalidText="Number is not valid"*/}
            {/*             size="sm"*/}
            {/*             id="decimal input"*/}
            {/*/>*/}
            <MenuItemDivider />
            <MenuItem label="Add"
                      onClick={addPerson}
                      className={classes.menuItem}
            />
            <MenuItemDivider />
            <MenuItem label="Delete All"
                      onClick={deleteAll}
                      kind="danger"
                      className={classes.menuItem}
            />
            <MenuItem label="Change File"
                      onClick={handleFileChange}
                      kind="danger"
                      className={classes.menuItem}
            />
          </OverflowMenu>
        </div>

        <div className={classes.outputsContainer}>

          <DisplayOutput excelFile={excelFile}
                         numberOfOutputs={numberOfOutputs}
                         setNumberOfOutputs={setNumberOfOutputs}
                         decimal={decimal}
          />

        </div>

      </section>
  );
}

export default FileChosen;