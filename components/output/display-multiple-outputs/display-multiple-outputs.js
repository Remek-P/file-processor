import classes from "@/components/output/section/section-module.module.scss";
import SearchSuggestions from "@/components/search/suggestions/search-suggestions";
import {Tile} from "@carbon/react";
import SearchSuggestionsDetails from "@/components/search/sugestions-details/search-suggestions-details";

function DisplayMultipleOutputs({ labelDataArray, searchUsers, setInputValue}) {

  const pickSearchedPerson = (e) => {
    setInputValue(e.target.value);
  }

  return (
      <section>
        <ul className={classes.searchContainer}>
          {labelDataArray.map((label, index) =>
              <SearchSuggestions key={index} element={label}>
                {label}
              </SearchSuggestions>
          )}
        </ul>
        <ul>
          {searchUsers.map((user, index) =>
              <li key={index} onClick={pickSearchedPerson}>
                <Tile>
                  <SearchSuggestionsDetails details={user} value={user[0]}/>
                </Tile>
              </li>
          )}
        </ul>
      </section>
  );
}

export default DisplayMultipleOutputs;