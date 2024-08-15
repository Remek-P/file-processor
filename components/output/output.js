import IdAvailable from "@/components/output/id-available/id-available";
import IdNotAvailable from "@/components/output/id-not-available/id-not-available";

function Output({
                  excelFile,
                  index,
                  IDIndex,
                  setIDIndex,
                  decimal,
                  setDecimal,
                  excludedArray,
                  toggleIDView,
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
                      IDIndex={IDIndex}
                      setIDIndex={setIDIndex}
                      excelFile={excelFile}
                      decimal={decimal}
                      setDecimal={setDecimal}
                      toggleIDView={toggleIDView}
                      handleDeleteChecked={handleDeleteChecked}
                      excludedArray={excludedArray}
                      setExcludedArray={setExcludedArray}
                      searchSuggestionsArray={searchSuggestionsArray}
  />
}

export default Output;