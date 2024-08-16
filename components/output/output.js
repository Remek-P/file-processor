import IdAvailable from "@/components/output/id-available/id-available";
import IdNotAvailable from "@/components/output/id-not-available/id-not-available";

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



  const handleIDPick = (e) => {
    setIDIndex(e.target.dataset.value);
  }

  const searchSuggestionsArray = excelFile.slice(2).map(person =>
      <option key={person[IDIndex]} value={person[IDIndex]}>{person.id}</option>
  );

  if (IDIndex === -1) return <IdNotAvailable labels={excelFile[1]}
                                             handleIDPick={handleIDPick} />

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