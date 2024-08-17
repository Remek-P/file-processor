import { useDeferredValue, useRef, useState } from "react";

import Search from "@/components/search/search";
import DeleteOutput from "@/components/output/deleteOutput/deleteOutput";
import Sections from "@/components/output/section/sections";

import classes from "@/components/output/output.module.scss";

function IdAvailable({
                       index,
                       IDIndex,
                       decimal,
                       excelFile,
                       toggleIDView,
                       userDataArray,
                       excludedArray,
                       setExcludedArray,
                       hideDB_ID_Tile,
                       handleDeleteChecked,
                       searchSuggestionsArray,
                     }) {

  const [inputValue, setInputValue] = useState("");

  const searchRef = useRef(null);

  const deferredInputValue = useDeferredValue(inputValue);

  const searchID = "search";

  const handleClick = () => {
    searchRef.current.focus();
  }

  return (
      <>
        <datalist id={searchID}>
          {searchSuggestionsArray}
        </datalist>


        <div className={classes.outputSearchContainer}>

          <div className={`${classes.outputSearch} shadow`}>
            <Search id={searchID}
                    searchRef={searchRef}
                    inputValue={inputValue}
                    setInputValue={setInputValue}
            />
          </div>

          <DeleteOutput index={index} handleDeleteChecked={handleDeleteChecked}/>

        </div>

        <Sections IDIndex={IDIndex}
                  decimal={decimal}
                  excelFile={excelFile}
                  searchRef={searchRef}
                  userDataArray={userDataArray}
                  inputValue={deferredInputValue}
                  setInputValue={setInputValue}
                  hideDB_ID_Tile={hideDB_ID_Tile}
                  excludedArray={excludedArray}
                  setExcludedArray={setExcludedArray}
                  toggleIDView={toggleIDView}
                  handleClick={handleClick}
        />
      </>
  );
}

export default IdAvailable;