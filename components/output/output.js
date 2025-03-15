import { useContext, useMemo, useRef, useState } from "react";

import DisplayData from "@/components/output/display-data/display-data";

import {
  FileDataGlobalContext,
  IsContainingSubheadersContext, QueryContext,
  // QueryContext,
  SearchSuggestionsOrderGlobalContext
} from "@/context/global-context";
import { isContainingSubheaders } from "@/utils/parserUtils";

import SearchSuggestions from "@/components/search/search-file/search-suggestions/search-suggestions";
import { convertUnderscoreToSpace } from "@/utils/general";
import SearchOutput from "@/components/search/search-output/search-output";


function Output({
                  IDIndex,
                  outputId,
                  hideDB_ID_Tile,
                  isDirectFetchResults,
                  fetchDirectlyDataFromDB,
                }) {

  const { file } = useContext(FileDataGlobalContext);
  const { isSubheaders } = useContext(IsContainingSubheadersContext);

  const [ query ] = useContext(QueryContext);
  const [ searchSuggestionsOrder, setSearchSuggestionsOrder ] = useContext(SearchSuggestionsOrderGlobalContext);

  const searchRef = useRef(outputId);
  const condition = searchRef && query;
  const initialValue = condition ? query : "";

  const [ inputValue, setInputValue ] = useState(initialValue);

  const isSubheadersTrue = useMemo(() => isContainingSubheaders(file), [ file ]);

  const headersArray = useMemo(() => {
    const firstRow = convertUnderscoreToSpace(file[0])

    if ((isSubheadersTrue && isSubheaders === false) ||
        (!isSubheadersTrue && (isSubheaders === undefined || isSubheaders === false)))
      return firstRow;

    return [ firstRow, convertUnderscoreToSpace(file[1]) ];
  }, [ file, isSubheaders ]);

  const userDataArray = useMemo(() => {
    if ((isSubheadersTrue && isSubheaders === false) ||
        (!isSubheadersTrue && (isSubheaders === undefined || isSubheaders === false)))
      return file.slice(1);

    return file.slice(2);
  }, [ file, isSubheaders ]);

  const searchID = "search";

  const handleFocus = () => searchRef.current.focus();

  return (
      <>

        <SearchSuggestions IDIndex={ IDIndex }
                           searchID={ searchID }
                           userDataArray={ userDataArray }
                           searchSuggestionsOrder={ searchSuggestionsOrder }/>

        <SearchOutput isDirectFetchResults={ isDirectFetchResults }
                      searchID={ searchID }
                      searchRef={ searchRef }
                      setInputValue={ setInputValue }
                      fetchDirectlyDataFromDB={ fetchDirectlyDataFromDB }
                      outputId={ outputId }
        />

        <DisplayData IDIndex={ IDIndex }
                     file={ file }
                     headersArray={ headersArray }
                     userDataArray={ userDataArray }
                     inputValue={ inputValue }
                     setInputValue={ setInputValue }
                     hideDB_ID_Tile={ hideDB_ID_Tile }
                     searchSuggestionsOrder={ searchSuggestionsOrder }
                     setSearchSuggestionsOrder={ setSearchSuggestionsOrder }
                     handleFocus={ handleFocus }
        />
      </>
  );
}

export default Output;