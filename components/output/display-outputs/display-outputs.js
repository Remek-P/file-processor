import Output from "@/components/output/output";

import classes from "@/components/file-chosen/file-chosen.module.scss";
import {useContext} from "react";
import {NumberOfOutputsContext} from "@/context/global-context";

function DisplayOutputs({
                         IDIndex,
                         hideDB_ID_Tile,
                       }) {

  const [ numberOfOutputs  ] = useContext(NumberOfOutputsContext);

  return (
      <>
        {
          numberOfOutputs.map(output =>
              <div key={output.id} className={classes.outputContainer}>
                <Output outputId={output.id}
                        IDIndex={IDIndex}
                        hideDB_ID_Tile={hideDB_ID_Tile}
                />
              </div>
          )
        }
      </>
  );
}

export default DisplayOutputs;