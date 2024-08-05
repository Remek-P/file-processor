function ShowMetrics({ index,
                       labelData,
                       colData,
                       showPercentages,
                       decimal,
                     }) {

  const convertToPercentages = (+colData * 100).toFixed(decimal);
  const roundToGivenDecimal = (+colData).toFixed(decimal);

  // Double escape required for the regex test (regexCheckForNumberWithSymbol)
  const regexSymbolArray = ["%", "p\%", "\\$", "US\\$", "USD", "AUD", "A\\$", "CAD", "C\\$", "\\€", "EUR", "\\¥", "JPY", "\\£", "GBP", "CNY", "PLN", "zł", "\\>", "\\>\\=", "\\<", "\\<\\="];
  const stringSymbolArray = regexSymbolArray.map((item) => item.replaceAll("\\", ""))

  const regexCheckForNumberWithSymbol = new RegExp(`^\\d+(.\\d+)?(${regexSymbolArray.join("|")})$`);

  const containsSymbol = (value, symbolArray) => {
    if (typeof value === "string") {
      const array = symbolArray.map(sign => value.includes(sign));
      const displaySymbol = []
      array.find((sign, index) => sign === true ? displaySymbol.push(index) : null)
      return symbolArray[displaySymbol]
    }
  };

  const symbol = containsSymbol(colData, stringSymbolArray);

  const display = () => {
    // Check if number
    if (!isNaN(+convertToPercentages)) {

      // returns original data
      if (showPercentages === undefined) return colData;
      // enables toggling between percentage views
      return showPercentages ? `${convertToPercentages}%` : roundToGivenDecimal

    } else {

        // if not a number test if this is a number stored as a string
        if (typeof colData === "string" && regexCheckForNumberWithSymbol.test(colData)) {
        const convertToNumber = (+(colData.replace(containsSymbol(colData, stringSymbolArray), "")));

          if (symbol === "%" || symbol === "p%") {

              if (showPercentages === undefined) return convertToNumber.toFixed(decimal) + symbol
              return showPercentages ? `${convertToNumber.toFixed(decimal)}${symbol}` : convertToNumber.toFixed(decimal)

          } else if (symbol === "zł") return `${convertToNumber.toFixed(decimal)}${symbol}`

            else return `${convertToNumber.toFixed(decimal)}${symbol}`

      } else return colData
    }
  }

  return (
      <div key={`${colData}+${labelData}`} className={`subContainer subContainer${index}`}>
        <h6>{ labelData }</h6>
        <p>{ display() }</p>
      </div>
  )


}

export default ShowMetrics;