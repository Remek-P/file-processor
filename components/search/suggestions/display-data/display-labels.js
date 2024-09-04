import {Tooltip} from "@carbon/react";

import classes from "@/components/output/output.module.scss";
import ShowIcon from "@/components/search/suggestions/display-data/show-icon";

function DisplayLabels({
                         active,
                         index,
                         label,
                         showIcon,
                         searchSuggestionsOrder,
                         handleSort,
}) {

  // TODO: efficient display of sorting icon
  // const show = showIcon === active && searchSuggestionsOrder !== undefined

  return (
      <Tooltip align="top" description="sort">
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