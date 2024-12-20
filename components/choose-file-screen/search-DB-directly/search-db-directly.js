import classes from "@/components/choose-file-screen/choose-file.module.scss";
import {Button, Tile} from "@carbon/react";
import SearchbarIcon from "@/components/search/icon/searchbar-icon";

function SearchDbDirectly({ setIsSearchDatabase }) {

  const handleSearch = () => {
    setIsSearchDatabase(true);
  }

  return (
      <Tile className={`${classes.tile} ${classes.optionContainerSpacing}`}>
        <div className={classes.optionContainerDescription}>
          <h6>Search database</h6>
          <p className={classes.optionContainerP}>Search the database directly</p>
        </div>
        <Button size="md" onClick={handleSearch}>
          <SearchbarIcon />
          <span>Search</span>
        </Button>
      </Tile>
  );
}

export default SearchDbDirectly;