import { useEffect, useRef, useState, useTransition } from "react";

import classes from "./search.module.scss";
import SearchbarIcon from "@/components/search/search-file/icon/searchbar-icon";

function Search({ setInputValue, searchRef, id="search" }) {

  const [localInputValue, setLocalInputValue] = useState("")
  const [isPending, startTransition] = useTransition();

  const lastProcessedValueRef = useRef("");

  const isDeleteVisible = localInputValue.length !== 0

  const handleTyping = (e) => {
    setLocalInputValue(e.target.value)
  }

  const handleAccept = (e) => {
    if (e.key === "Enter") {

      const input = e.target.value.trim();
      if (lastProcessedValueRef.current.trim() === input) return

      startTransition(() => setInputValue(localInputValue));

      lastProcessedValueRef.current = input;
    }
  }

  useEffect(() => {
    searchRef.current.focus();
  }, []);

  return (
      <div className={classes.searchContainer}>

        <SearchbarIcon isDeleteVisible={isDeleteVisible}
                       isPending={isPending}
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

export default Search;