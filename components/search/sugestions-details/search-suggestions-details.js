function SearchSuggestionsDetails({ details, value }) {
  return (
      <ul style={{display: "flex", gap: "10px"}}>
        {details.map((detail, index) =>
            <li key={index} value={value}>{detail}</li>)}
      </ul>
  );
}

export default SearchSuggestionsDetails;