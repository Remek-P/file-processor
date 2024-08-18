import { Button, Tooltip } from "@carbon/react";

import classes from "./search.module.scss";
import {useEffect} from "react";

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
        <svg className={classes.searchIcon}
             xmlns="http://www.w3.org/2000/svg"
             id="icon"
             viewBox="0 0 32 32">
          <path xmlns="http://www.w3.org/2000/svg"
                d="M29,27.5859l-7.5521-7.5521a11.0177,11.0177,0,1,0-1.4141,1.4141L27.5859,29ZM4,13a9,9,0,1,1,9,9A9.01,9.01,0,0,1,4,13Z"/>
        </svg>

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
                                                  children="x"
                                                  className={classes.deleteIcon}
                                          />
                                        </Tooltip>)
        }

      </div>

  );
}

export default Search;