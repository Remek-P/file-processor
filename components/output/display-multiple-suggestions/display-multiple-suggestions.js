import TexTile from "@/components/tile-type/text-tile/texTile";

import classes from "@/components/output/output.module.scss";

import SearchSuggestions from "@/components/search/suggestions/search-suggestions";

function DisplayMultipleSuggestions({
                                  labelDataArray,
                                  searchUsers,
                                  inputValue,
                                  setInputValue,
                                }) {

  const reducePerformanceStrain = inputValue.length < 3;

  const indexOfID = labelDataArray.findIndex(element => element.toLowerCase() === "_id" || element.toLowerCase() === "id");

  const pickSearchedPerson = (e) => {
    setInputValue(e.target.value);
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
                                 indexOfID={indexOfID}
                                 searchUsers={searchUsers}
                                 pickSearchedPerson={pickSearchedPerson}
              />
          )}
        </ul>
      </section>
  );
}

export default DisplayMultipleSuggestions;