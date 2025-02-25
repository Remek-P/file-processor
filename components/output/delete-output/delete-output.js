import { useContext, useState } from "react";

import { ExcludedDataGlobalContext, NumberOfOutputsContext } from "@/context/global-context";

import { CloseFilled, CloseOutline } from "@carbon/react/icons";
import { IconButton } from "@carbon/react";

import classes from "../output.module.scss";

function DeleteOutput({ outputId, setUserQuery }) {

  const [ numberOfOutputs, setNumberOfOutputs ] = useContext(NumberOfOutputsContext);
  const [ , setExcludedArray ] = useContext(ExcludedDataGlobalContext);

  const [ hover, setHover ] = useState(false);

  const handleMouseEnter = () => setHover(true);
  const handleMouseLeave = () => setHover(false);
  const handleOnFocus = () => setHover(true);
  const handleOnBlur = () => setHover(false);

  const handleDelete = () => {
    if (numberOfOutputs.length <= 1) {
      setNumberOfOutputs([ { id: Date.now() } ])
      setExcludedArray([])
    }
    else setNumberOfOutputs(
        [ ...numberOfOutputs ].filter(output => output.id !== outputId)
    );
    setUserQuery("")
  }

  return (
      <div key={ outputId }
           className={ classes.outputDeleteOutput }
           onMouseEnter={ handleMouseEnter }
           onMouseLeave={ handleMouseLeave }
           onFocus={ handleOnFocus }
           onBlur={ handleOnBlur }>

        <IconButton kind="ghost"
                    label="Delete"
                    align="bottom"
                    onClick={ () => handleDelete(outputId) }
        >
          { !hover
              ? <CloseOutline aria-label="Delete" />
              : <CloseFilled aria-label="Delete" />
          }
        </IconButton>

      </div>

  );
}

export default DeleteOutput;