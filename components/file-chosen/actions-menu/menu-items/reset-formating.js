import {useContext} from "react";

import {
  DecimalGlobalContext,
  ExcludedDataGlobalContext,
  SearchSuggestionsOrderGlobalContext
} from "@/context/global-context";

import classes from "@/components/file-chosen/file-chosen.module.scss";
import {OverflowMenuItem} from "@carbon/react";

function ResetFormating() {

  const [, setDecimal] = useContext(DecimalGlobalContext);
  const [, setExcludedArray] = useContext(ExcludedDataGlobalContext);
  const [, setSearchSuggestionsOrder] = useContext(SearchSuggestionsOrderGlobalContext);

  const resetDataFormatting = () => {
    setDecimal(undefined);
    setExcludedArray([])
    setSearchSuggestionsOrder(undefined);
  }

  return (
      <OverflowMenuItem itemText="Reset Data Format"
                        onClick={resetDataFormatting}
                        isDelete={true}
                        className={classes.menuItem}
                        hasDivider
      />
  );
}

export default ResetFormating;