import {useContext} from "react";

import DisplayDataWithSubheaders from "@/components/output/display-data-with-subheaders/display-data-with-subheaders";

import {ToggleIDViewGlobalContext} from "@/context/global-context";
import { HEADER_LABEL } from "@/constants/constants";

function ShowDataWithSubheaders({ colDataArray, labelDataArray, headerDataArray, filteredOutDB_ID, hideDB_ID_Tile }) {

  const [ toggleIDView ] = useContext(ToggleIDViewGlobalContext);

  return (
      <>
        {
          filteredOutDB_ID.map(value =>
              <DisplayDataWithSubheaders key={value}
                    value={value}
                    colDataArray={colDataArray}
                    labelDataArray={labelDataArray}
                    headerDataArray={headerDataArray}
              />
          )
        }
        {
          !hideDB_ID_Tile && toggleIDView &&
            <DisplayDataWithSubheaders value={HEADER_LABEL}
                  colDataArray={colDataArray}
                  labelDataArray={labelDataArray}
                  headerDataArray={headerDataArray}
            />
        }
      </>
  );
}

export default ShowDataWithSubheaders;