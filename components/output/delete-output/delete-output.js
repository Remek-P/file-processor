import { useContext, useState } from "react";

import { ExcludedDataGlobalContext, NumberOfOutputsContext, QueryContext } from "@/context/global-context";

import { CloseFilled, CloseOutline } from "@carbon/react/icons";
import { IconButton } from "@carbon/react";

import classes from "../output.module.scss";

function DeleteOutput({ outputId }) {

  const [ , setQuery ] = useContext(QueryContext);
  const [ numberOfOutputs, setNumberOfOutputs ] = useContext(NumberOfOutputsContext);
  const [ , setExcludedArray ] = useContext(ExcludedDataGlobalContext);

  const [ hover, setHover ] = useState(false);

  const handleHoverAndFocus = (bool) => setHover(bool);

  const handleDelete = () => {
    if (numberOfOutputs.length <= 1) {
      const id = Date.now();
      setNumberOfOutputs([ { id } ]);
      setQuery(undefined)
      setExcludedArray([]);
    }
    else {
      setNumberOfOutputs(
          [ ...numberOfOutputs ].filter(output => output.id !== outputId)
      );
      // deleteQuery(outputId);
    }
  }

  return (
      <div key={ outputId }
           className={ classes.outputDeleteOutput }
           onMouseEnter={ () => handleHoverAndFocus(true) }
           onMouseLeave={ () => handleHoverAndFocus(false) }
           onFocus={ () => handleHoverAndFocus(true) }
           onBlur={ () => handleHoverAndFocus(false) }
      >
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