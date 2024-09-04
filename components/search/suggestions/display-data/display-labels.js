import {Tooltip} from "@carbon/react";

import classes from "@/components/output/output.module.scss";
import ShowIcon from "@/components/search/suggestions/display-data/show-icon";
import {useState} from "react";

function DisplayLabels({
                         active,
                         index,
                         label,
                         showIcon,
                         searchSuggestionsOrder,
                         handleSort,
}) {

  // const [sortDirection, setSortDirection] = useState();

  // TODO: efficient display of sorting icon
  const show = showIcon === active && searchSuggestionsOrder !== undefined

  // const sortDirection = searchSuggestionsOrder === undefined
  //     ? "Ascending"
  //     : searchSuggestionsOrder ? "Descending" : "Ascending";


  return (
      // <Tooltip align="right" description={`Sort ${sortDirection}`}>
      <Tooltip align="right" description="Sort">
        <h5 role="button"
            tabIndex="0"
            onClick={handleSort}
            onKeyDown={(e) => e.key === 'Enter' && handleSort(e)}
            data-index={index}
            className={classes.searchContainerHeader}
        >
          <span>{label}</span>
          {/*{show && <ShowIcon active={active} showIcon={showIcon} searchSuggestionsOrder={searchSuggestionsOrder}/>}*/}
        </h5>
      </Tooltip>
  );
}

export default DisplayLabels;