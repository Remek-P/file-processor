import {Tile} from "@carbon/react";

function SearchSuggestionsDetails({ details }) {

  return (
      <Tile>
        <ul style={{display: "flex", gap: "10px"}}>
          {details.map((detail, index) =>
              <li key={index}>{detail}</li>)}
        </ul>
      </Tile>
  );
}

export default SearchSuggestionsDetails;