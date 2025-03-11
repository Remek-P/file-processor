import classes from "@/components/search/search.module.scss";
import SearchbarIcon from "@/components/search/icon/searchbar-icon";
import { useState } from "react";
import { Select, SelectItem } from "@carbon/react";

function SearchDatabaseInput({ userQuery = "", searchRef, fetchDirectlyDataFromDB }) {

  const [ localInputValue, setLocalInputValue ] = useState(userQuery);
  const [ selectFieldSearch, setSelectFieldSearch ] = useState("ID");

  const isDeleteVisible = localInputValue.length !== 0;

  const id = "searchDatabaseInput";

  const handleTyping = (e) => {
    setLocalInputValue(e.target.value);
  }

  const handleSelect = (e) => {
    setSelectFieldSearch(e.target.value);
  }

  const handleAccept = async (e) => {
    if (e.key === "Enter") {
      const input = localInputValue.trim();

      if (input !== "") {
        fetchDirectlyDataFromDB(input, selectFieldSearch);
      }
    }
  }

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