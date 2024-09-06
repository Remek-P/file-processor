import {Button, Loading, Tooltip} from "@carbon/react";

import {Delete, Search} from "@carbon/icons-react";

import classes from "@/components/search/search.module.scss";

function SearchbarIcon({ id, isPending, isDeleteVisible, setLocalInputValue, searchRef }) {

  const handleDeleteButton = () => {
    // TODO: check preferred behaviour
    // setInputValue("");
    setLocalInputValue("");
    searchRef.current.focus();
  }

    if (isPending) return <Loading active="active" description="Searching for querry" id={id} small={true} withOverlay={false} className={null} />;

    if (!isDeleteVisible) return <Search className={classes.searchIcon}/>;

    if (isDeleteVisible) return (
        <Tooltip align="bottom" description="clear">
          <Button kind="ghost"
                  onClick={handleDeleteButton}
                  size="sm"
                  className={classes.deleteIcon}>
            <Delete/>
          </Button>
        </Tooltip>
    );
}

export default SearchbarIcon;