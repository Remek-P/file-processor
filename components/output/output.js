import {useContext, useMemo, useRef, useState} from "react";

import Search from "@/components/search/search";
import DeleteOutput from "@/components/output/deleteOutput/deleteOutput";
import Sections from "@/components/output/section/sections";

import classes from "@/components/output/output.module.scss";
import {FileDataGlobalContext, SearchSuggestionsOrderGlobalContext} from "@/context/global-context";
import {checkForNumber} from "@/utils/sortUtils";

function Output({
                  index,
                  IDIndex,
                  hideDB_ID_Tile,
                  handleDeleteChecked,
                }) {

  const { file} = useContext(FileDataGlobalContext);

  const [searchSuggestionsOrder, setSearchSuggestionsOrder] = useContext(SearchSuggestionsOrderGlobalContext);

  const [inputValue, setInputValue] = useState("");

  const isContainingSubheaders = !file[1].some(datum => checkForNumber(datum));

  const userDataArray = useMemo(() => {
    if (isContainingSubheaders) {
      return file.slice(2);
    } else if (!isContainingSubheaders) {
      return file.slice(1);
    } else {
      throw new Error("Unsupported number of headers");
    }
  }, [file]);

  const searchRef = useRef(null);

  const searchID = "search";

  // TODO: Use sortData form sortUtils
  const defaultOrderSearchSuggestions = userDataArray.map(id => id[IDIndex]);
  const ascendingOrderSearchSuggestions = [...defaultOrderSearchSuggestions].sort((a, b) => a.toString().localeCompare(b.toString()));
  const descendingOrderSearchSuggestions = [...defaultOrderSearchSuggestions].sort((a, b) => b.toString().localeCompare(a.toString()));
  // TODO: change does not work
  const searchArray = searchSuggestionsOrder === undefined
      ? defaultOrderSearchSuggestions
      : searchSuggestionsOrder
          ? ascendingOrderSearchSuggestions
          : descendingOrderSearchSuggestions;

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
                    setInputValue={setInputValue}
            />
          </div>

          <DeleteOutput index={index} handleDeleteChecked={handleDeleteChecked}/>

        </div>

        <Sections IDIndex={IDIndex}
                  file={file}
                  userDataArray={userDataArray}
                  inputValue={inputValue}
                  setInputValue={setInputValue}
                  hideDB_ID_Tile={hideDB_ID_Tile}
                  searchSuggestionsOrder={searchSuggestionsOrder}
                  setSearchSuggestionsOrder={setSearchSuggestionsOrder}
                  handleClick={handleClick}
        />
      </>
  );
}

export default Output;