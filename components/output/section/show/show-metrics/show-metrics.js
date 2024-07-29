function ShowMetrics({ index,
                       labelDataArray,
                       colDataArray,
                       showPercentages,
                       decimal,
                     }) {

  const convertToPercentages = (+colDataArray[index] * 100).toFixed(decimal);
  const roundToGivenDecimal = (+colDataArray[index]).toFixed(decimal);

  const displayData =
      showPercentages
          ? !isNaN(+convertToPercentages)
              ? `${convertToPercentages}%`
              : colDataArray[index]
          : !isNaN(+convertToPercentages)
              ? roundToGivenDecimal
              : typeof colDataArray[index] === "string" && colDataArray[index].includes("%")
                  ? colDataArray[index].replace(/(?<=\d)%/g, "")
                  : colDataArray[index]

  if (labelDataArray[index] === "month") console.log(labelDataArray[index], colDataArray[index])
  return (
      <div key={index} className={`subContainer subContainer${index}`}>
        <h6>{labelDataArray[index]}</h6>
        <p>{displayData}</p>
      </div>
  )


}

export default ShowMetrics;