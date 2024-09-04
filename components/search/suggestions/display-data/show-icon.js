import {SortAscending, SortDescending} from "@carbon/icons-react";

function ShowIcon({ active, showIcon, searchSuggestionsOrder }) {

  if (searchSuggestionsOrder === undefined) return null;
  else if (showIcon === active) {
    if (searchSuggestionsOrder) return <SortAscending/>;
    if (!searchSuggestionsOrder) return <SortDescending/>;
  }

}

export default ShowIcon;