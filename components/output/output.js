import IdAvailable from "@/components/output/id-available/id-available";

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

  const searchSuggestionsArray = excelFile.slice(2).map(person =>
      <option key={person[IDIndex]} value={person[IDIndex]}>{person.id}</option>
  );

  return <IdAvailable index={index}
                      decimal={decimal}
                      IDIndex={IDIndex}
                      setIDIndex={setIDIndex}
                      excelFile={excelFile}
                      toggleIDView={toggleIDView}
                      hideDB_ID_Tile={hideDB_ID_Tile}
                      excludedArray={excludedArray}
                      setExcludedArray={setExcludedArray}
                      handleDeleteChecked={handleDeleteChecked}
                      searchSuggestionsArray={searchSuggestionsArray}
  />
}

export default Output;