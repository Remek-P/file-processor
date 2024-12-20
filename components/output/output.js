import {useContext, useEffect, useMemo, useRef, useState} from "react";

import Search from "@/components/search/search";
import DeleteOutput from "@/components/output/delete-output/delete-output";
import DisplayData from "@/components/output/display-data/display-data";

import {
  FileDataGlobalContext,
  IsContainingSubheadersContext,
  SearchSuggestionsOrderGlobalContext
} from "@/context/global-context";
import { isContainingSubheaders } from "@/utils/parserUtils";

import classes from "@/components/output/output.module.scss";
import SearchSuggestions from "@/components/search/search-suggestions/search-suggestions";
import SearchDatabaseInput from "@/components/choose-file-screen/search-database-input/search-database-input";


function Output({
                  IDIndex,
                  outputId,
                  userQuery,
                  setUserQuery,
                  hideDB_ID_Tile,
                  isDirectFetchResults,
                  fetchDirectlyDataFromDB,
                }) {

  const { file} = useContext(FileDataGlobalContext);
  const { isSubheaders } = useContext(IsContainingSubheadersContext);

  const [ searchSuggestionsOrder, setSearchSuggestionsOrder ] = useContext(SearchSuggestionsOrderGlobalContext);

  const [ inputValue, setInputValue ] = useState("");

  const isSubheadersTrue = isContainingSubheaders(file);

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

  useEffect(() => {
    if (userQuery) setInputValue(userQuery);
  }, [userQuery]);

  return (
      <>

        <SearchSuggestions IDIndex={IDIndex}
                           searchID={searchID}
                           userDataArray={userDataArray}
                           searchSuggestionsOrder={searchSuggestionsOrder} />

        <div className={classes.outputSearchContainer}>

          <div className={`${classes.outputSearch} shadow`}>
            {
              !isDirectFetchResults
                  ? <Search id={searchID}
                            searchRef={searchRef}
                            setInputValue={setInputValue}
                  />
                  : <SearchDatabaseInput userQuery={userQuery}
                                         setUserQuery={setUserQuery}
                                         fetchDirectlyDataFromDB={fetchDirectlyDataFromDB}
                  />
            }
          </div>

          <DeleteOutput outputId={outputId} setUserQuery={setUserQuery} />

        </div>

        <DisplayData IDIndex={IDIndex}
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