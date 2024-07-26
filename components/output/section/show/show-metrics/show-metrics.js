function ShowMetrics({ index,
                       labelDataArray,
                       colDataArray,
                       showPercentages,
                       decimal = 1,
                     }) {

  const convertToPercentages = (+colDataArray[index] * 100).toFixed(decimal)

  const displayData = showPercentages
      ? !isNaN(+convertToPercentages)
          ? <span>{`${convertToPercentages}%`}</span>
          : <span>{colDataArray[index]}</span>
      : <span>{colDataArray[index]}</span>

  return (
      <div key={index} className={`subContainer subContainer${index}`}>
        <h6>{labelDataArray[index]}</h6>
        { displayData }
      </div>
  )


}

export default ShowMetrics;