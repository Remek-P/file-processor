import classes from "./search.module.scss";


function Search({ inputValue, setInputValue, searchRef, id="search" }) {

  const handleTyping = (e) => {
    // const input = e.target.value.toString();
    // const check = input.match(/^[0-9]*$/);
    // if (check) setInputValue(input)

    setInputValue(e.target.value.toString());
  }

  return (
      <div className={classes.searchContainer} >
          <svg className={classes.searchIcon}
               xmlns="http://www.w3.org/2000/svg"
               id="icon"
               viewBox="0 0 32 32">
            <path xmlns="http://www.w3.org/2000/svg"
                  d="M29,27.5859l-7.5521-7.5521a11.0177,11.0177,0,1,0-1.4141,1.4141L27.5859,29ZM4,13a9,9,0,1,1,9,9A9.01,9.01,0,0,1,4,13Z"/>
          </svg>
          <input id={id}
                 name={id}
                 list={id}
                 type="search"
                 title="Numbers only"
                 value={inputValue}
                 placeholder="Please type to filter a person"
                 className={classes.search}
                 onChange={(e) => handleTyping(e)}
                 ref={searchRef}
          />
      </div>

  );
}

export default Search;