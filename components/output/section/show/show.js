import ShowDataWithSubheaders
  from "@/components/output/section/show/show-data-with-subheaders/show-data-with-subheaders";
import ShowDataWithoutSubheaders
  from "@/components/output/section/show/show-data-without-subheaders/show-data-without-subheaders";

function Show({
                value,
                isSubheaders,
                colDataArray,
                labelDataArray,
                headerDataArray,
              }) {

  return isSubheaders === true
      ? <ShowDataWithSubheaders value={value}
                                colDataArray={colDataArray}
                                labelDataArray={labelDataArray}
                                headerDataArray={headerDataArray}
      />
      : <ShowDataWithoutSubheaders value={value}
                                   colDataArray={colDataArray}
                                   labelDataArray={labelDataArray}
      />
}

export default Show;