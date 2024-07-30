function ShowMetrics({ index,
                       labelData,
                       colData,
                       showPercentages,
                       decimal,
                     }) {

  const convertToPercentages = (+colData * 100).toFixed(decimal);
  const roundToGivenDecimal = (+colData).toFixed(decimal);

  const data =
      showPercentages
          ? !isNaN(+convertToPercentages)
              ? `${convertToPercentages}%`
              : colData
          : !isNaN(+convertToPercentages)
              ? roundToGivenDecimal
              : typeof colData === "string" && colData.includes("%")
                  ? colData.replace(/(?<=\d)%/g, "")
                  : colData

  const display = () => {
    if (showPercentages === undefined) return colData;
    return data
  }

  return (
      <div key={`${colData}+${labelData}`} className={`subContainer subContainer${index}`}>
        <h6>{labelData}</h6>
        <p>{display()}</p>
      </div>
  )


}

export default ShowMetrics;