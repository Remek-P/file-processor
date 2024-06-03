function ShowMetrics({ index,
                       labelDataArray,
                       colDataArray,
                       decimal = 1,
                     }) {

  return (
      <div key={index}
           className={`subContainer subContainer${index}`}>
        <h6>{labelDataArray[index].split(" ")[2]}</h6>
        <span>{`${(colDataArray[index] * 100).toFixed(decimal)}%`}</span>
      </div>
  )
}

export default ShowMetrics;