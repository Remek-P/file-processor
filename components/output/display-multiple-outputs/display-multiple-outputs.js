import SearchSuggestions from "@/components/search/suggestions/search-suggestions";
import SearchSuggestionsDetails from "@/components/search/sugestions-details/search-suggestions-details";
import classes from "@/components/output/section/section-module.module.scss";
import TexTile from "@/components/tile-type/text-tile/texTile";
import {useRef} from "react";

function DisplayMultipleOutputs({ labelDataArray,
                                  searchUsers,
                                  inputValue,
                                  setInputValue,
}) {

  const valueRef = useRef();

  const pickSearchedPerson = () => {
    setInputValue(valueRef.current.value);
  }

  const reducePerformanceStrain = inputValue.length < 3;

  return (
      <section>
        {
          reducePerformanceStrain && <TexTile text={"Please type at least 3 characters to display search results"} />
        }

        <ul className={classes.searchContainer}>
          {!reducePerformanceStrain && labelDataArray.map((label, index) =>
              <SearchSuggestions key={index} element={label}>
                {label}
              </SearchSuggestions>
          )}
        </ul>

        <ul>
          {!reducePerformanceStrain && searchUsers.map((user, index) =>
              <li key={index} value={user[0]} onClickCapture={pickSearchedPerson} ref={valueRef}>
                  <SearchSuggestionsDetails details={user}/>
              </li>
          )}
        </ul>
      </section>
  );
}

export default DisplayMultipleOutputs;