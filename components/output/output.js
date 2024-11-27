import { useContext, useMemo, useRef, useState } from "react";

import Search from "@/components/search/search";
import DeleteOutput from "@/components/output/deleteOutput/deleteOutput";
import Sections from "@/components/output/section/sections";

import {
  FileDataGlobalContext,
  IsContainingSubheadersContext,
  SearchSuggestionsOrderGlobalContext
} from "@/context/global-context";
import { parseDataArray, parseHeaders } from "@/utils/parserUtils";

import classes from "@/components/output/output.module.scss";
import SearchSuggestions from "@/components/search/search-suggestions/search-suggestions";


function Output({
                  index,
                  IDIndex,
                  hideDB_ID_Tile,
                  handleDeleteChecked,
                }) {

  const { file} = useContext(FileDataGlobalContext);
  const { isSubheaders} = useContext(IsContainingSubheadersContext);

  const [searchSuggestionsOrder, setSearchSuggestionsOrder] = useContext(SearchSuggestionsOrderGlobalContext);

  const [inputValue, setInputValue] = useState("");

  // TODO: Make sure to implement user override;
  const headersArray = useMemo(() => {
    return parseHeaders(file);
  }, [file, isSubheaders]);

  const userDataArray = useMemo(() => {
    return parseDataArray(file);
  }, [file, isSubheaders]);

  const searchRef = useRef(null);

  const searchID = "search";

  const handleClick = () => {
    searchRef.current.focus();
  }

  return (
      <>

        <SearchSuggestions IDIndex={IDIndex}
                           searchID={searchID}
                           userDataArray={userDataArray}
                           searchSuggestionsOrder={searchSuggestionsOrder} />

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