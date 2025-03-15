import Output from "@/components/output/output";

import classes from "@/components/file-chosen/file-chosen.module.scss";
import {useContext} from "react";
import { NumberOfOutputsContext } from "@/context/global-context";
import {ErrorBoundary} from "@carbon/react";


function DisplayOutputs({
                          IDIndex,
                          hideDB_ID_Tile,
                          isDirectFetchResults,
                          fetchDirectlyDataFromDB,
                       }) {

  const [ numberOfOutputs  ] = useContext(NumberOfOutputsContext);

  //TODO: While multiple outputs are present, one search nullifies the second in direct DB search

  return (
      <ErrorBoundary fallback={<div>Error parsing the file</div>}>
        {
          numberOfOutputs.map(output =>
              <div key={output.id} className={classes.outputContainer}>
                <Output outputId={output.id}
                        IDIndex={IDIndex}
                        hideDB_ID_Tile={hideDB_ID_Tile}
                        isDirectFetchResults={isDirectFetchResults}
                        fetchDirectlyDataFromDB={fetchDirectlyDataFromDB}
                />
              </div>
          )
        }
        </ErrorBoundary>
  );
}

export default DisplayOutputs;