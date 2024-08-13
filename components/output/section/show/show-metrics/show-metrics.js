import classes from "../../../output.module.scss";

function ShowMetrics({
                       index,
                       labelData,
                       colData,
                       showPercentages,
                       decimal,
                     }) {

  // Without this constant, the toggle percentages button in in SectionLayout, would have changed all the value by setting specific decimal place
  const localDecimal = decimal !== undefined
      ? decimal
      : showPercentages === undefined
          ? undefined
          : 2

  const convertToPercentages = (+colData * 100).toFixed(localDecimal);
  const roundToGivenDecimal = (+colData).toFixed(localDecimal);
  if (labelData === "day.month") console.log("colData", typeof colData)

  // Double escape required for the regex test (regexCheckForNumberWithSymbol)
  const regexSymbolArray = ["%", "p\\%", "\\$", "US\\$", "USD", "AUD", "A\\$", "CAD", "C\\$", "\\€", "EUR", "\\¥", "JPY", "\\£", "GBP", "CNY", "PLN", "zł", "\\>", "\\>\\=", "\\<", "\\<\\="];
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

  // Get the symbol from string
  const symbol = containsSymbol(colData, stringSymbolArray);

  const display = () => {
    // if empty
    if (colData === "") return null;

    // Check if number
    if (!isNaN(+convertToPercentages)) {

      // returns original data
      if (showPercentages === undefined && decimal === undefined) return colData;
      // enables toggling between percentage views
      return showPercentages ? `${convertToPercentages}%` : roundToGivenDecimal

    } else if (colData === typeof "string") {

      // if empty
      if (colData.trim() === "") return null;
      // if not a number test if this is a number stored as a string
      if (typeof colData === "string" && regexCheckForNumberWithSymbol.test(colData)) {
        const convertToNumber = (+(colData.replace(containsSymbol(colData, stringSymbolArray), "")));
        const convertedAndRounded = convertToNumber.toFixed(decimal)

        if (symbol === "%" || symbol === "p%") {

          if (showPercentages === undefined) return `${convertedAndRounded}${symbol}`
          return showPercentages ? `${convertedAndRounded}${symbol}` : convertedAndRounded

          // traditionally the zł (currency indicator) is displayed after the value
        } else if (symbol === "zł") return `${convertedAndRounded}${symbol}`

        else return `${symbol}${convertedAndRounded}`

      } else return colData
    } else if (colData === typeof "date") {

      return colData

    } else return colData
  }

  return (
      <div key={`${colData}+${labelData}`} className={`${classes.subContainer} subContainer${index}`}>
        <h6>{ labelData }</h6>
        <p>{ display() }</p>
      </div>
  )


}

export default ShowMetrics;