import { FixedSizeList as List } from "react-window";

import {forwardRef} from "react";

import classes from "@/components/output/output.module.scss";

function DisplayValues({ data, i, IDIndex, pickSearchedOutput }) {


  const Row = ({ index, style }) => {
    const itemData = data[i]
    return (
        <div
            key={itemData[IDIndex]}
            className={classes.searchContainerData}
            onClick={() => pickSearchedOutput(data[IDIndex])}
        >
          {itemData} {/* Display the desired property */}
        </div>
    );
  };

  return (
      <List
          itemCount={1}
          itemSize={1}
          height={45}
          width={150}
          itemData={data} // Pass your data here to Row

      >
        {Row}
      </List>
  );
}

export default DisplayValues;