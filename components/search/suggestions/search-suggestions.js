import { Tile } from "@carbon/react";
import classes from "@/components/output/output.module.scss";

function SearchSuggestions({
                             label,
                             index,
                             IDIndex,
                             searchUsers,
                             pickSearchedOutput
                           }) {
  return (
      <li>
        <Tile>
          <h5 className={classes.searchContainerHeader}>{label}</h5>
          <ul className={classes.searchContainerDataContainer}>
            {searchUsers.map(data =>
              <li key={data[IDIndex]}
                  data-value={data[IDIndex]}
                  onClick={pickSearchedOutput}
                  className={classes.searchContainerData}
              >
                {data[index]}
              </li>
            )}
          </ul>
        </Tile>
      </li>
  );
}

export default SearchSuggestions;