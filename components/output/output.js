import {useDeferredValue, useRef, useState} from "react";

import Search from "@/components/search/search";
import Sections from "@/components/output/section/sections";

import classes from "./output.module.scss";
import DeleteOutput from "@/components/output/deleteOutput/deleteOutput";

function Output({
                  excelFile,
                  index,
                  handleDeleteChecked,
                  decimal,
                  setDecimal,
                  excludedArray,
                  setExcludedArray
                }) {

  const [inputValue, setInputValue] = useState("");

  const searchRef = useRef(null);
  const count = useRef(1);

  const deferredInputValue = useDeferredValue(inputValue);

  const handleClick = () => {
    searchRef.current.focus();
  }

  const searchID = "search";

  const warningArray = [];
  const indexOfID = excelFile[1].findIndex(element => element.toLowerCase() === "_id" || element.toLowerCase() === "id");
  const searchSuggestionsArray = excelFile.slice(2).map((person, index) => {
    if (person.length === 0) {
      const warningMessage = `Row ${index + 3} does not contain any data and will be skipped.`
      warningArray.push(warningMessage);
      return null
    }
    if (!person[indexOfID]) {
      const ID = `${count.current * 2541}.${count.current * 2541}.${index}`;
      const warningMessage = `Row ${index + 3} does not contain any identifier. Please add proper ID in the file. Temporary ID  ${ID} added.`
      warningArray.push(warningMessage);
      return person[indexOfID] = +ID
    }
    return <option key={person[indexOfID]} value={person[indexOfID].toString()}>{person.id}</option>
  });
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
                  setDecimal={setDecimal}
                  excludedArray={excludedArray}
                  setExcludedArray={setExcludedArray}
        />
        {
          warningArray.length > 0 && warningArray.map((warning) => {
            return <p>{warning}</p>
          })
        }
      </>
  );
}

export default Output;