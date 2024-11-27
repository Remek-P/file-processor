import { useContext, useMemo, useRef, useState } from "react";

import Search from "@/components/search/search";
import DeleteOutput from "@/components/output/deleteOutput/deleteOutput";
import Sections from "@/components/output/section/sections";

import {
  FileDataGlobalContext,
  IsContainingSubheadersContext,
  SearchSuggestionsOrderGlobalContext
} from "@/context/global-context";
import { isContainingSubheaders } from "@/utils/parserUtils";

import classes from "@/components/output/output.module.scss";
import SearchSuggestions from "@/components/search/search-suggestions/search-suggestions";


function Output({
                  index,
                  IDIndex,
                  hideDB_ID_Tile,
                  handleDeleteChecked,
                }) {

  const { file} = useContext(FileDataGlobalContext);
  const { isSubheaders } = useContext(IsContainingSubheadersContext);

  const [ searchSuggestionsOrder, setSearchSuggestionsOrder ] = useContext(SearchSuggestionsOrderGlobalContext);

  const [ inputValue, setInputValue ] = useState("");

  const isSubheadersTrue = isContainingSubheaders(file);

  // TODO: Make sure to implement user override;
  const headersArray = useMemo(() => {
    if ((isSubheadersTrue && isSubheaders === false)
        || (!isSubheadersTrue && (isSubheaders === undefined || isSubheaders === false)))
      return file[0];

    return [file[0], file[1]];
  }, [ file, isSubheaders ]);

  const userDataArray = useMemo(() => {
    if ((isSubheadersTrue && isSubheaders === false)
        || (!isSubheadersTrue && (isSubheaders === undefined || isSubheaders === false)))
      return file.slice(1);

    return file.slice(2);
  }, [ file, isSubheaders ]);

  const searchRef = useRef(null);

  const searchID = "search";

  const handleFocus = () => {
    searchRef.current.focus();
  }

  // TODO: If isSubheadersTrue === true and there is none

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
                  handleFocus={handleFocus}
        />
      </>
  );
}

export default Output;