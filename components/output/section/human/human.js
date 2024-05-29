import Birthday from "@/components/output/section/birthday/birthday";
import ID from "@/components/output/section/ID/ID";
import {Tile} from "@carbon/react";

function Human({
                 colDataArray,
                 labelDataArray,
                 index,
                 value
               }) {
  return (
      <Tile className={`container${index} shadow`}>
        {value.toLowerCase().includes("birth day") && <Birthday key={value}
                   value={value}
                   colDataArray={colDataArray}
                   index={index}/>}
        { value.toLowerCase() === "human" && <ID key={value}
             colDataArray={colDataArray}
             labelDataArray={labelDataArray}
             index={index}
             value={value}/>}
      </Tile>
  )
}

export default Human;