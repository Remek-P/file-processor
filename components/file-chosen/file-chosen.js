import { useState } from "react";

import { MenuButton, MenuItem, MenuItemDivider } from "@carbon/react";

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


  return (
      <div className={classes.container}>

        <div className={`${classes.menuContainer} shadow`}>
          <MenuButton label="actions"
                      kind="ghost"
                      className={classes.menu}
                      menuAlignment="bottom-start"
          >
            <MenuItemDivider />
            <MenuItem label="Add person"
                      onClick={addPerson}
                      className={classes.menuItem}
            />
            <MenuItemDivider />
            <MenuItem label="Change File"
                      onClick={handleFileChange}
                      kind="danger"
                      className={classes.menuItem}
            />
          </MenuButton>
        </div>

        <div className={classes.outputsContainer}>

          <DisplayOutput excelFile={excelFile} numberOfOutputs={numberOfOutputs} setNumberOfOutputs={setNumberOfOutputs} />

        </div>

      </div>
  );
}

export default FileChosen;