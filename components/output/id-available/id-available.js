import { useDeferredValue, useRef, useState } from "react";

import Search from "@/components/search/search";
import DeleteOutput from "@/components/output/deleteOutput/deleteOutput";
import Sections from "@/components/output/section/sections";

import classes from "@/components/output/output.module.scss";

function IdAvailable({
                       index,
                       IDIndex,
                       excelFile,
                       decimal,
                       setDecimal,
                       searchSuggestionsArray,
                       excludedArray,
                       handleDeleteChecked,
                       setExcludedArray,
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
            <Search setInputValue={setInputValue}
                    inputValue={inputValue}
                    id={searchID}
                    searchRef={searchRef}
            />
          </div>

          <DeleteOutput index={index} handleDeleteChecked={handleDeleteChecked}/>

        </div>

        <Sections excelFile={excelFile}
                  IDIndex={IDIndex}
                  inputValue={deferredInputValue}
                  setInputValue={setInputValue}
                  searchRef={searchRef}
                  handleClick={handleClick}
                  decimal={decimal}
                  setDecimal={setDecimal}
                  excludedArray={excludedArray}
                  setExcludedArray={setExcludedArray}
        />
      </>
  );
}

export default IdAvailable;