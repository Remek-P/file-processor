import ShowDataWithSubheaders
  from "@/components/output/section/show/show-data-with-subheaders/show-data-with-subheaders";
import ShowDataWithoutSubheaders
  from "@/components/output/section/show/show-data-without-subheaders/show-data-without-subheaders";
import {useContext} from "react";
import {IsContainingSubheadersContext} from "@/context/global-context";

function Show({
                value,
                colDataArray,
                labelDataArray,
                headerDataArray,
              }) {

  const { isSubheaders } = useContext(IsContainingSubheadersContext);

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