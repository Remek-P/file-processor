
import { Select, SelectItem } from "@carbon/react";

function DateFormatPicker({ separator, format, setDateFormat }) {

  const separatorValuesNoSpaceArray = [ ":", "/", ".", "-" ];
  const dateFormatArray = [ "DD-MM-YYYY", "YYYY-MM-DD" ];

  const selectDateFormat = (e) => {
    setDateFormat(prevState => ({ ...prevState, format: e.target.value }));
  }

  const selectDateSeparator = (e) => {
    setDateFormat(prevState => ({ ...prevState, separator: e.target.value }));
  }

  return (
      <>

        <Select
            id="separator selector"
            labelText="Select the separator"
            onChange={ selectDateSeparator }
            size="sm"
        >
          <SelectItem value={ separator } text={ separator } hidden />
          <SelectItem value=" " text="space"/>
          { separatorValuesNoSpaceArray.map(item =>
              <SelectItem key={ item } value={ item } text={ item } />
          ) }
        </Select>

        <Select
            id="date format selector"
            labelText="Select the format"
            onChange={ selectDateFormat }
            size="sm"
        >
          <SelectItem value={ format } text={ format } hidden />
          { dateFormatArray.map(item =>
              <SelectItem key={ item } value={ item } text={ item } />
          ) }
        </Select>

      </>
  );
}

export default DateFormatPicker;