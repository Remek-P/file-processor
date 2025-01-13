import {Button, Loading, Tooltip} from "@carbon/react";

import {Delete, Search} from "@carbon/react/icons";

import classes from "@/components/search/search.module.scss";

function SearchbarIcon({ id, isPending, isDeleteVisible, setLocalInputValue, searchRef }) {

  const handleDeleteButton = () => {
    // TODO: check preferred behaviour
    // setInputValue("");
    setLocalInputValue("");
    searchRef.current.focus();
  }

    if (isPending) return <Loading active={true} description="Searching for querry" id={id} small={true} withOverlay={false} className={null} />;

    if (!isDeleteVisible) return <Search size={16} className={classes.searchIcon}/>;

    if (isDeleteVisible) return (
        <Tooltip align="bottom" description="clear">
          <Button kind="ghost"
                  onClick={handleDeleteButton}
                  size="sm"
                  className={classes.deleteIcon}>
            <Delete size={16}/>
          </Button>
        </Tooltip>
    );
}

export default SearchbarIcon;