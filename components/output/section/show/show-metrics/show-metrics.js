function ShowMetrics({ index,
                       labelData,
                       colData,
                       showPercentages,
                       decimal,
                     }) {

  const convertToPercentages = (+colData * 100).toFixed(decimal);
  const roundToGivenDecimal = (+colData).toFixed(decimal);

  const regexCheckForNumberWithSign = /^\d+(.\d+)?%$/g;
  const regexCheckForSign = /(?<=\d)%/g

  const data = (
      !isNaN(+convertToPercentages)
          ? showPercentages
              ? `${convertToPercentages}%`
              : roundToGivenDecimal
          : typeof colData === "string" && regexCheckForNumberWithSign.test(colData.trim())
              ? showPercentages
                  ? `${(+(colData.replace(regexCheckForSign, ""))).toFixed(decimal)}%`
                  : (+(colData.replace(regexCheckForSign, ""))).toFixed(decimal)
              : colData
  );

  return (
      <div key={`${colData}+${labelData}`} className={`subContainer subContainer${index}`}>
        <h6>{labelData}</h6>
        <p>{data}</p>
      </div>
  )


}

export default ShowMetrics;