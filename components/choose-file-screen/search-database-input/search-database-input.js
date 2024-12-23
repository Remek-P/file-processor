import classes from "@/components/search/search.module.scss";
import SearchbarIcon from "@/components/search/icon/searchbar-icon";
import { useRef, useState } from "react";

function SearchDatabaseInput({ userQuery = "", fetchDirectlyDataFromDB }) {

  const [ localInputValue, setLocalInputValue ] = useState(userQuery);

  const searchRef = useRef();

  const isDeleteVisible = localInputValue.length !== 0;

  const id = "searchDatabaseInput";

  const handleTyping = (e) => {
    setLocalInputValue(e.target.value)
  }

  const handleAccept = async (e) => {
    if (e.key === "Enter") {
      const input = localInputValue.trim();
      if (input !== "") {
        fetchDirectlyDataFromDB(input);
      }
    }
  }

  return (
      <div className={classes.searchContainer}>

        <SearchbarIcon isDeleteVisible={isDeleteVisible}
                       id={id}
                       isPending={null}
                       setLocalInputValue={setLocalInputValue}
                       searchRef={searchRef}
        />

        <input id={id}
               name={id}
               list={id}
               type="search"
               value={localInputValue}
               placeholder="Type at least 2 characters"
               className={classes.search}
               onChange={handleTyping}
               onKeyDown={handleAccept}
               ref={searchRef}
               autoComplete="on"
               autoFocus
        />


      </div>

  );
}

export default SearchDatabaseInput;