import {useDeferredValue, useRef, useState} from "react";

import Search from "@/components/search/search";
import Sections from "@/components/output/section/sections";

import classes from "./output.module.scss";
import DeleteOutput from "@/components/output/deleteOutput/deleteOutput";

function Output({ excelFile, index, handleDeleteChecked, decimal }) {

  const [inputValue, setInputValue] = useState("");


  const searchRef = useRef(null);

  const deferredInputValue = useDeferredValue(inputValue);

  const handleClick = () => {
    searchRef.current.focus();
  }

  const searchID = "search";

  const indexOfID = excelFile[1].findIndex(element => element.toLowerCase() === "_id" || element.toLowerCase() === "id");

  const searchSuggestionsArray = excelFile.slice(2).map(person =>
      <option key={person[indexOfID]} value={person[indexOfID].toString()}>{person.id}</option>
  );

  return (
      <>
        <datalist id={searchID}>
          { searchSuggestionsArray }
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
                  inputValue={deferredInputValue}
                  setInputValue={setInputValue}
                  searchRef={searchRef}
                  handleClick={handleClick}
                  decimal={decimal}
        />
      </>
  );
}

export default Output;