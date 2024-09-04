import {Button, InlineLoading, Tooltip} from "@carbon/react";
import {Delete, Search as SearchIcon} from "@carbon/icons-react";

import {useEffect, useState, useTransition} from "react";

import classes from "./search.module.scss";

function Search({ inputValue, setInputValue, searchRef, id="search" }) {

  const [localInputValue, setLocalInputValue] = useState("")
  const [isPending, startTransition] = useTransition();

  const handleTyping = (e) => {
    setLocalInputValue(e.target.value)
  }

  const handleAccept = (e) => {
    if (e.key === "Enter") startTransition(() => setInputValue(localInputValue));
  }

  const handleDeleteButton = () => {
    setInputValue("");
    setLocalInputValue("");
    searchRef.current.focus();
  }

  useEffect(() => {
    searchRef.current.focus();
  }, []);

  return (
      <div className={classes.searchContainer}>

        {isPending ? <InlineLoading id={id} status="active" /> : <SearchIcon className={classes.searchIcon}/>}

        <input id={id}
               name={id}
               list={id}
               type="search"
               value={localInputValue}
               placeholder="Type at least 3 characters"
               className={classes.search}
               onChange={handleTyping}
               onKeyDown={handleAccept}
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