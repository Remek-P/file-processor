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