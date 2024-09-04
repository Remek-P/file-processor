import {Button, InlineLoading, Tooltip} from "@carbon/react";

import {Delete, Search} from "@carbon/icons-react";

import classes from "@/components/search/search.module.scss";

function SearchbarIcon({ id, isPending, isDeleteVisible, setInputValue, setLocalInputValue, searchRef }) {

  const handleDeleteButton = () => {
    setInputValue("");
    setLocalInputValue("");
    searchRef.current.focus();
  }

    if (isPending) return <InlineLoading id={id} status="active"/>;

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