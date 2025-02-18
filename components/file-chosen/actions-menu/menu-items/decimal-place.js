import {NumberInput} from "@carbon/react";
import {useContext} from "react";
import {DecimalGlobalContext} from "@/context/global-context";

function DecimalPlace() {

  const [decimal, setDecimal] = useContext(DecimalGlobalContext);

  const handleDecimalChange = (event, {value, direction}) => {
    if ((direction === "down" || !direction) && value >= 0) {
      setDecimal(value);
    }
    if (direction === "up") {
      setDecimal(value);
    }
  }

  return (
      <NumberInput value={decimal}
                   min={0}
                   max={20}
                   onChange={handleDecimalChange}
                   step={1}
                   iconDescription="increase decrease"
                   label="Set decimal place"
                   hideLabel={true}
                   invalidText="Invalid value (0-20)"
                   size="sm"
                   id="decimal input"
                   disableWheel={true}
      />
  );
}

export default DecimalPlace;