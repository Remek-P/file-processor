import classes from "@/components/search/search-file/search.module.scss";
import SearchbarIcon from "@/components/search/search-file/icon/searchbar-icon";
import { useContext, useRef, useState } from "react";
import { Select, SelectItem } from "@carbon/react";
import { QueryContext } from "@/context/global-context";

function SearchDatabaseInput({ searchRef, setInputValue, fetchDirectlyDataFromDB }) {

  const [ , setQuery ] = useContext(QueryContext);

  const [ localInputValue, setLocalInputValue ] = useState("");
  const [ selectFieldSearch, setSelectFieldSearch ] = useState("ID");

  const isDeleteVisible = localInputValue.length !== 0;

  const lastProcessedValueRef = useRef({});

  const id = "searchDatabaseInput";

  const handleTyping = (e) => {
    setLocalInputValue(e.target.value);
  }

  const handleSelect = (e) => setSelectFieldSearch(e.target.value);

  const chooseInput = () => {
    searchRef
        ? setInputValue(localInputValue)
        : setQuery(localInputValue);
  }

  const handleAccept = async (e) => {
    if (e.key === "Enter") {
      const input = localInputValue.trim();

      const doubleEnter = (
          input === lastProcessedValueRef.current.input &&
          selectFieldSearch === lastProcessedValueRef.current.selectFieldSearch
      );
      //If the search from the main screen is performed, the function will not stop re-triggering the search, because no ref is passed as a prop.
      if (searchRef && doubleEnter) return;

      if (input !== "") {
        chooseInput();
        fetchDirectlyDataFromDB(input, selectFieldSearch);
      }

      lastProcessedValueRef.current = { input, selectFieldSearch }
    }
  };

  return (
      <div className={ classes.searchContainer }>

        <SearchbarIcon isDeleteVisible={ isDeleteVisible }
                       id={ id }
                       isPending={ null }
                       setLocalInputValue={ setLocalInputValue }
                       searchRef={ searchRef }
        />

        <input id={ id }
               name={ id }
               list={ id }
               type="search"
               value={ localInputValue }
               placeholder="Type at least 2 characters"
               className={ classes.search }
               onChange={ handleTyping }
               onKeyDown={ handleAccept }
               ref={ searchRef }
               autoComplete="on"
               autoFocus
        />

        <Select id="key-search"
                labelText="Select search field"
                hideLabel={ true } size="sm"
                value={ selectFieldSearch }
                onChange={ handleSelect }
        >
          <SelectItem text="ID" value="ID"/>
          <SelectItem text="Full search" value="all" />
        </Select>

      </div>

  );
}

export default SearchDatabaseInput;