import {MenuButton, MenuItem, MenuItemDivider} from "@carbon/react";
import Output from "@/components/output/output";
import classes from "./file-chosen.module.scss";

function FileChosen({
                      handleFileChange,
                      excelFile,
                      numberOfPersons,
                      setNumberOfPersons
}) {

  const addPerson = () => {
    setNumberOfPersons(prevState => prevState + 1)
  }

  const removeLastPerson = () => {
    if (numberOfPersons > 0) setNumberOfPersons(prevState => prevState - 1)
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
            <MenuItem label="Remove last person"
                      onClick={removeLastPerson}
                      className={classes.menuItem}
                      kind="danger"
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

          {
            [...Array(numberOfPersons)].map((_, index) => {
              return (
                  <div key={index} className={classes.outputContainer}>
                    <Output key={index} excelFile={excelFile}/>
                  </div>
              )
            })
          }

        </div>

      </div>
  );
}

export default FileChosen;