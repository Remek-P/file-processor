import { useState } from "react";

import { OverflowMenu, MenuItem, MenuItemDivider } from "@carbon/react";

import DisplayOutput from "@/components/choose-file-screen/displayOutput/displayOutput";

import classes from "./file-chosen.module.scss";

function FileChosen({
                      handleFileChange,
                      excelFile,
}) {

  const [numberOfOutputs, setNumberOfOutputs] = useState([{delete: false}])

  const addPerson = () => {
    setNumberOfOutputs(prevState => [...prevState, {delete: false}])
  }

  const deleteAll = () => {
    setNumberOfOutputs([])
  }


  return (
      <section className={classes.sectionContainer}>

        <div className={`${classes.menuContainer} shadow`}>
          <OverflowMenu className={classes.menu}
                        aria-label="actions menu"
                        flipped={true}
          >
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
          />

        </div>

      </section>
  );
}

export default FileChosen;