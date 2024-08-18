import { useDeferredValue, useMemo, useRef, useState } from "react";

import Search from "@/components/search/search";
import DeleteOutput from "@/components/output/deleteOutput/deleteOutput";
import Sections from "@/components/output/section/sections";

import classes from "@/components/output/output.module.scss";

function Output({
                  excelFile,
                  index,
                  IDIndex,
                  decimal,
                  toggleIDView,
                  hideDB_ID_Tile,
                  excludedArray,
                  setExcludedArray,
                  searchSuggestionsOrder,
                  handleDeleteChecked,
                }) {

  const [inputValue, setInputValue] = useState("");
  const userDataArray = useMemo(() =>  excelFile.slice(2), [excelFile]);

  const searchRef = useRef(null);

  const deferredInputValue = useDeferredValue(inputValue);

  const searchID = "search";


  const defaultOrderSearchSuggestions = userDataArray.map(id => id[IDIndex]);
  const ascendingOrderSearchSuggestions = [...defaultOrderSearchSuggestions].sort((a, b) => a.toString().localeCompare(b.toString()));
  const descendingOrderSearchSuggestions = [...defaultOrderSearchSuggestions].sort((a, b) => b.toString().localeCompare(a.toString()));
  // TODO: change does not work
  const searchArray = searchSuggestionsOrder === undefined
      ? defaultOrderSearchSuggestions
      : searchSuggestionsOrder
          ? ascendingOrderSearchSuggestions
          : descendingOrderSearchSuggestions;
  // console.log("userDataArray", userDataArray)
  console.log("defaultOrderSearchSuggestions", defaultOrderSearchSuggestions)
  // console.log("ascendingOrderSearchSuggestions", ascendingOrderSearchSuggestions)
  // console.log("descendingOrderSearchSuggestions", descendingOrderSearchSuggestions)
  // console.log("searchArray", searchArray)

  const searchSuggestionsArray = searchArray.map(person =>
      <option key={person} value={person}>{person}</option>
  );

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

export default Output;