function ShowMetrics({ index,
                       labelDataArray,
                       colDataArray,
                       decimal = 1,
                       type
                     }) {

  if (type === "normal percentage") {
    return (
        <div key={index}
             className={`subContainer subContainer${index}`}>
          <h6>{labelDataArray[index]}</h6>
          <span>{`${(colDataArray[index] * 100).toFixed(decimal)}%`}</span>
        </div>
    )
  } else if (type === "world percentage") {
    return (
        <div key={index}
             className={`subContainer subContainer${index}`}>
          <h6>{labelDataArray[index].split(" ")[2]}</h6>
          <span>{`${(colDataArray[index] * 100).toFixed(decimal)}%`}</span>
        </div>
    )
  } else if (type === "bar chart percentage") {
    return (
        <div key={index}
             className={`subContainer subContainer${index}`}>
          <h6>{labelDataArray[index]}</h6>
          <span>{colDataArray[index]}</span>
        </div>
    )
  } else {
    return (
        <div key={index}
             className={`subContainer subContainer${index}`}>
          <h6>{labelDataArray[index]}</h6>
          <span>{`${(colDataArray[index] * 100).toFixed(decimal)}%`}</span>
        </div>
    )
  }


}

export default ShowMetrics;