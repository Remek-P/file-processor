import classes from "@/components/output/output.module.scss";
import Search from "@/components/search/search-file/search";
import SearchDatabaseInput from "@/components/search/search-database-input/search-database-input";
import DeleteOutput from "@/components/output/delete-output/delete-output";

function SearchOutput({
                        isDirectFetchResults,
                        searchID,
                        searchRef,
                        setInputValue,
                        fetchDirectlyDataFromDB,
                        outputId
                      }) {
  return (
      <div className={ classes.outputSearchContainer }>

        <div className={ `${ classes.outputSearch } shadow` }>
          {
            !isDirectFetchResults
                ? <Search id={ searchID }
                          searchRef={ searchRef }
                          setInputValue={ setInputValue }
                />
                : <SearchDatabaseInput searchRef={ searchRef }
                                       setInputValue={ setInputValue }
                                       fetchDirectlyDataFromDB={ fetchDirectlyDataFromDB }
                />
          }
        </div>

        <DeleteOutput outputId={ outputId } />

      </div>
  );
}

export default SearchOutput;