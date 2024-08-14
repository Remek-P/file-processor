import TexTile from "@/components/tile-type/text-tile/texTile";

import classes from "@/components/output/output.module.scss";

import SearchSuggestions from "@/components/search/suggestions/search-suggestions";

function DisplayMultipleSuggestions({
                                      IDIndex,
                                      labelDataArray,
                                      searchUsers,
                                      inputValue,
                                      setInputValue,
                                    }) {

  const reducePerformanceStrain = inputValue.length < 3;

  const pickSearchedOutput = (e) => {
    setInputValue(e.target.dataset.value);
  }

  return (
      <section>
        {
            reducePerformanceStrain && <TexTile text={"Please type at least 3 characters to display search results"}/>
        }

        <ul className={classes.searchContainer}>
          {!reducePerformanceStrain && labelDataArray.map((label, index) =>
              <SearchSuggestions key={index}
                                 label={label}
                                 index={index}
                                 IDIndex={IDIndex}
                                 searchUsers={searchUsers}
                                 pickSearchedOutput={pickSearchedOutput}
              />
          )}
        </ul>
      </section>
  );
}

export default DisplayMultipleSuggestions;