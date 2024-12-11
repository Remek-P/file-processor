import ShowValues from "@/components/output/show-metrics/show-values";


function ShowDate({ value, label }) {

  //TODO: Data manipulation

  return <ShowValues label={label} displayValue={value} />
}

export default ShowDate;