import {useContext, useMemo, useRef, useState} from "react";

import Search from "@/components/search/search";
import DeleteOutput from "@/components/output/deleteOutput/deleteOutput";
import Sections from "@/components/output/section/sections";

import {FileDataGlobalContext, SearchSuggestionsOrderGlobalContext} from "@/context/global-context";
import { parseDataArray, parseHeaders } from "@/utils/parserUtils";

import classes from "@/components/output/output.module.scss";


function Output({
                  index,
                  IDIndex,
                  isSubheaders,
                  hideDB_ID_Tile,
                  handleDeleteChecked,
                }) {

  const { file} = useContext(FileDataGlobalContext);

  const [searchSuggestionsOrder, setSearchSuggestionsOrder] = useContext(SearchSuggestionsOrderGlobalContext);

  const [inputValue, setInputValue] = useState("");

  // TODO: Make sure to implement user override;
  const headersArray = useMemo(() => {
    return parseHeaders(file);
  }, [file]);

  const userDataArray = useMemo(() => {
    return parseDataArray(file);
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

          <DeleteOutput index={index}
                        handleDeleteChecked={handleDeleteChecked} />

        </div>

        <Sections IDIndex={IDIndex}
                  file={file}
                  headersArray={headersArray}
                  userDataArray={userDataArray}
                  isSubheaders={isSubheaders}
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