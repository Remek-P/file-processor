import IdAvailable from "@/components/output/id-available/id-available";
import {useMemo} from "react";

function Output({
                  excelFile,
                  index,
                  IDIndex,
                  setIDIndex,
                  decimal,
                  toggleIDView,
                  hideDB_ID_Tile,
                  excludedArray,
                  setExcludedArray,
                  handleDeleteChecked,
                }) {

  const userDataArray = useMemo(() =>  excelFile.slice(2), [excelFile]);
  const defaultOrderSearchSuggestions = userDataArray;
  const ascendingOrderSearchSuggestions = userDataArray.sort((a, b) => a.toString().localeCompare(b.toString()));
  const descendingOrderSearchSuggestions = userDataArray.sort((a, b) => a.toString().localeCompare(b.toString()));



  const searchSuggestionsArray = descendingOrderSearchSuggestions.map(person =>
      <option key={person[IDIndex]} value={person[IDIndex]}>{person.id}</option>
  );

  return <IdAvailable index={index}
                      decimal={decimal}
                      IDIndex={IDIndex}
                      setIDIndex={setIDIndex}
                      excelFile={excelFile}
                      toggleIDView={toggleIDView}
                      userDataArray={userDataArray}
                      hideDB_ID_Tile={hideDB_ID_Tile}
                      excludedArray={excludedArray}
                      setExcludedArray={setExcludedArray}
                      handleDeleteChecked={handleDeleteChecked}
                      searchSuggestionsArray={searchSuggestionsArray}
  />
}

export default Output;