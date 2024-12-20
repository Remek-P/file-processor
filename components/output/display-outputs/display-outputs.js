import Output from "@/components/output/output";

import classes from "@/components/file-chosen/file-chosen.module.scss";
import {useContext} from "react";
import {NumberOfOutputsContext} from "@/context/global-context";

function DisplayOutputs({
                          IDIndex,
                          userQuery,
                          setUserQuery,
                          hideDB_ID_Tile,
                          isDirectFetchResults,
                          fetchDirectlyDataFromDB,
                       }) {

  const [ numberOfOutputs  ] = useContext(NumberOfOutputsContext);

  // While multiple outputs are present, one search nullifies the second

  return (
      <>
        {
          numberOfOutputs.map(output =>
              <div key={output.id} className={classes.outputContainer}>
                <Output outputId={output.id}
                        IDIndex={IDIndex}
                        userQuery={userQuery}
                        setUserQuery={setUserQuery}
                        hideDB_ID_Tile={hideDB_ID_Tile}
                        isDirectFetchResults={isDirectFetchResults}
                        fetchDirectlyDataFromDB={fetchDirectlyDataFromDB}
                />
              </div>
          )
        }
      </>
  );
}

export default DisplayOutputs;