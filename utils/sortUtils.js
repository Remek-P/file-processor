export const symbolsArray = [">", ">=", "<", "<=","%", "p%", "$", "US$", "USD", "AUD", "A$", "CAD", "C$", "€", "EUR", "¥", "JPY", "£", "GBP", "CNY", "PLN", "zł"];

export const escapedRegexSymbolArray = symbolsArray.map(item => item.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
// const regexCheckForNumberWithSymbolBefore = new RegExp(`^(${escapedRegexSymbolArray.join("|")})\\s*\\d+(\\.\\d+)?$`);
// const regexCheckForNumberWithSymbolAfter = new RegExp(`^\\d+(\\.\\d+)?\\s*(${escapedRegexSymbolArray.join("|")})$`);
export const regexOverall = new RegExp(`^((${escapedRegexSymbolArray.join("|")})\\s*|\\s*(${escapedRegexSymbolArray.join("|")})\\s*)?\\d+(\\.\\d+)?\\s*(${escapedRegexSymbolArray.join("|")})?$`);

export const separateNumbersAndStrings = (data) => {
  // Check if data contains any symbols from symbols Array
  const checkSymbolsInArray = symbolsArray.filter(symbol => data.includes(symbol));

  let numberOnlyData = data;
  // if number is a string with a symbol, filter out the symbol sign to create a clean string
  if (checkSymbolsInArray.length > 0) {
    for (const symbol in checkSymbolsInArray) {
      numberOnlyData = numberOnlyData.replace(checkSymbolsInArray[symbol], "").trim()
    }
  }

  return { numberOnlyData, checkSymbolsInArray };
}

export const checkForNumber = (data) => !isNaN(+data);
export const checkForString = (data) => typeof data === "string";

export const compareValues = (aValue, bValue, sortOrder) => {

  const isA_Number = checkForNumber(aValue);
  const isB_Number = checkForNumber(bValue);

  // Sorting, if data are numbers (number as a string or number)
  if (isA_Number && isB_Number) {
    if (sortOrder) return +aValue - +bValue;
    else return +bValue - +aValue;
  }

  // Are data strings
  const isA_String = checkForString(aValue);
  const isB_String = checkForString(bValue);
  const bothAreStrings = isA_String && isB_String

  // regex test
  const numberAsStringWithSymbolsA = regexOverall.test(aValue);
  const numberAsStringWithSymbolsB = regexOverall.test(bValue);
  const bothPassedRegex = numberAsStringWithSymbolsA & numberAsStringWithSymbolsB;

  // Sorting if data are strings numbers with symbols from symbolsArray
  if (bothAreStrings && bothPassedRegex) {

    // extract number
    const numberOnlyDataA = +separateNumbersAndStrings(aValue).numberOnlyData;
    const numberOnlyDataB = +separateNumbersAndStrings(bValue).numberOnlyData;

    if (sortOrder) return numberOnlyDataA - numberOnlyDataB;
    else return numberOnlyDataB - numberOnlyDataA;
  }

  // In every other case use local sorting
  if (sortOrder) return aValue.localeCompare(bValue);
  else return bValue.localeCompare(aValue);
}