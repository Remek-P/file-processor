function Search({ inputValue, setInputValue }) {
  return (
      <input type="text"
             value={inputValue}
             onChange={(e) => setInputValue(e.target.value.toString())}
             placeholder="Please type to filter a person"
             style={{maxWidth: "20%", marginBlock: "2%"}}
      />
  );
}

export default Search;