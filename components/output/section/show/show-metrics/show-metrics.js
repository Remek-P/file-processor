function ShowMetrics({ index,
                       labelDataArray,
                       colDataArray,
                       showPercentages,
                       decimal,
                     }) {

  const convertToPercentages = (+colDataArray[index] * 100).toFixed(decimal);
  const roundToGivenDecimal = (+colDataArray[index]).toFixed(decimal);

  const data =
      showPercentages
          ? !isNaN(+convertToPercentages)
              ? `${convertToPercentages}%`
              : colDataArray[index]
          : !isNaN(+convertToPercentages)
              ? roundToGivenDecimal
              : typeof colDataArray[index] === "string" && colDataArray[index].includes("%")
                  ? colDataArray[index].replace(/(?<=\d)%/g, "")
                  : colDataArray[index]

  const display = () => {
    if (showPercentages === undefined) return colDataArray[index];
    return data
  }
  console.log("display", display())
  return (
      <div key={index} className={`subContainer subContainer${index}`}>
        <h6>{labelDataArray[index]}</h6>
        <p>{display()}</p>
      </div>
  )


}

export default ShowMetrics;