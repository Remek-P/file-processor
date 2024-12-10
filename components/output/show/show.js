import {useContext} from "react";

import ShowDataWithSubheaders from "@/components/output/show/show-data-with-subheaders/show-data-with-subheaders";
import ShowDataWithoutSubheaders
  from "@/components/output/show/show-data-without-subheaders/show-data-without-subheaders";

import {IsContainingSubheadersContext} from "@/context/global-context";
import {HEADER_LABEL} from "@/constants/constants";

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

  // return (
  //     <>
  //
  //       {
  //         filteredOutDB_ID.map(value =>
  //             <Show key={value}
  //                   value={value}
  //                   colDataArray={colDataArray}
  //                   labelDataArray={labelDataArray}
  //                   headerDataArray={headerDataArray}
  //             />
  //         )
  //       }
  //       {
  //           !hideDB_ID_Tile && toggleIDView &&
  //           <Show value={HEADER_LABEL}
  //                 colDataArray={colDataArray}
  //                 labelDataArray={labelDataArray}
  //                 headerDataArray={headerDataArray}
  //           />
  //       }
  //     </>
  // );
}

export default Show;