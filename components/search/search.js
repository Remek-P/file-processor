import { Button, Tooltip } from "@carbon/react";
import {Delete, Search as SearchIcon} from "@carbon/icons-react";

import { useEffect } from "react";

import classes from "./search.module.scss";

function Search({ inputValue, setInputValue, searchRef, id="search" }) {

  const handleTyping = (e) => {
    setInputValue(e.target.value);
  }

  const handleDeleteButton = () => {
    setInputValue("");
    searchRef.current.focus();
  }

  useEffect(() => {
    searchRef.current.focus();
  }, []);

  return (
      <div className={classes.searchContainer}>

        <SearchIcon className={classes.searchIcon}/>

        <input id={id}
               name={id}
               list={id}
               type="search"
               value={inputValue}
               placeholder="Type at least 3 characters"
               className={classes.search}
               onChange={(e) => handleTyping(e)}
               ref={searchRef}
               autoComplete="on"
               autoFocus
        />

        {
            inputValue.length !== 0 && (<Tooltip align="bottom" description="clear">
                                          <Button kind="ghost"
                                                  onClick={handleDeleteButton}
                                                  size="sm"
                                                  className={classes.deleteIcon}>
                                            <Delete />
                                          </Button>
                                        </Tooltip>)
        }

      </div>

  );
}

export default Search;