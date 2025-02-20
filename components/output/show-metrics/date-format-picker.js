
import { Select, SelectItem } from "@carbon/react";
import { dateFormats } from "@/utils/dateUtils";
import { compareValues } from "@/utils/sortUtils";
import { useMemo } from "react";
import dayjs from "dayjs";

function DateFormatPicker({ sortDate, setDateFormat }) {

  const sortedDateFormat = useMemo(() => {
    return sortDate === undefined
        ? dateFormats
        : [ ...dateFormats ].sort((a, b) => compareValues(a, b, sortDate));
  }, [ sortDate ]);

  const today = new Date();

  const selectDateFormat = (e) => {
    setDateFormat(e.target.value);
  }

  const pickerText = (format) => {
    return dayjs(today).format(format);
  }

  return (
      <Select
          id="date format selector"
          labelText="Select the format"
          onChange={ selectDateFormat }
          size="sm"
      >
        <SelectItem value={ "default" } text={ "default" } />
        { sortedDateFormat.map(format =>
            <SelectItem key={ format } value={ format } text={ pickerText(format) }/>
        ) }
      </Select>
  );
}

export default DateFormatPicker;