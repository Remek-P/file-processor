function Search({ inputValue, setInputValue }) {
  return (
      <input type="text"
             value={inputValue} onChange={(e) => setInputValue(e.target.value.toString())}
             placeholder="Please type to filter a person"
      />
  );
}

export default Search;