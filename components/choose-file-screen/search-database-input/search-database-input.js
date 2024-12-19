import classes from "@/components/search/search.module.scss";
import SearchbarIcon from "@/components/search/icon/searchbar-icon";
import {useContext, useEffect, useRef, useState, useTransition} from "react";
import {FileDataGlobalContext} from "@/context/global-context";

function SearchDatabaseInput() {

  const {
    file,
    fileName,
    isLoading,
    warnings,
    addWarnings,
    deleteWarning,
    isDataFetched,
    setFile,
    setFileName,
    setLoading,
  } = useContext(FileDataGlobalContext);

  const [query, setQuery] = useState("");
  const [localInputValue, setLocalInputValue] = useState("")
  const [isPending, startTransition] = useTransition();
  const [results, setResults] = useState([])

  const searchRef = useRef();

  const isDeleteVisible = localInputValue.length !== 0;

  const id = "searchDatabaseInput";

  const handleTyping = (e) => {
    setLocalInputValue(e.target.value)
  }

  const handleAccept = async (e) => {
    if (e.key === "Enter") startTransition(() => setQuery(localInputValue));
  }

  useEffect(() => {
    if (query) {
      setLoading(true);
      fetch(`/api/mongoDB?query=${query}`)
          .then((response) => response.json()) // Parse the JSON response
          .then((data) => {
            setResults(data); // Set the results to state
            setLoading(false); // Hide loading spinner
          })
          .catch((error) => {
            console.error("Error fetching search results:", error);
            setLoading(false); // Hide loading spinner in case of an error
          });
    } else {
      setResults([]); // Clear results if the query is empty
    }
  }, [query]);

  console.log("results", results)

  return (
      <div className={classes.searchContainer}>

        <SearchbarIcon isDeleteVisible={isDeleteVisible}
                       id={id}
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

export default SearchDatabaseInput;