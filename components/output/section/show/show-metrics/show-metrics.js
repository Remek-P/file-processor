function ShowMetrics({ index,
                       labelDataArray,
                       colDataArray,
                       showPercentages,
                       decimal,
                     }) {

  const convertToPercentages = (+colDataArray[index] * 100).toFixed(decimal);
  const round = (+colDataArray[index]).toFixed(decimal);

  const displayData = showPercentages
      ? !isNaN(+convertToPercentages)
          ? <span>{`${convertToPercentages}%`}</span>
          : <span>{colDataArray[index]}</span>
      : !isNaN(+convertToPercentages)
          ? <span>{round}</span>
          : <span>{colDataArray[index]}</span>
      // : <span>{colDataArray[index]}</span>
  return (
      <div key={index} className={`subContainer subContainer${index}`}>
        <h6>{labelDataArray[index]}</h6>
        {displayData}
      </div>
  )


}

export default ShowMetrics;