import {Tile} from "@carbon/react";

function SearchSuggestions({ pickSearchedPerson = null, children, value = null }) {
  return (
      <li value={value} onClick={pickSearchedPerson}>
        <Tile>
          {children}
        </Tile>
      </li>
  );
}

export default SearchSuggestions;