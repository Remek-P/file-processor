import ShowValues from "@/components/output/show-metrics/show-values";
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import DateFormatPicker from "@/components/output/show-metrics/date-format-picker";
import { useState } from "react";
import { Modal } from "@carbon/react";
import { getSeparator } from "@/utils/dateUtils";

function ShowDate({ value, label, showDateFormat, setShowDateFormat }) {

  const [ dateFormat, setDateFormat ] = useState({ separator: undefined, format: undefined });
  const { separator, format } = dateFormat;

  const defaultSeparator = separator === undefined;
  const defaultFormat = format === undefined;
  const defaultDateFormat = defaultFormat && defaultSeparator;

  dayjs.extend(customParseFormat);

  const formated = defaultDateFormat ? value : dayjs(value).format(`DD${ separator }MM${ separator }YYYY`);
  const t = dayjs(value).format();
  const t2 = dayjs("23.11.1995");
  const t3 = dayjs("23 11 1995");
  console.log("t", t)
  console.log("t", t2)
  console.log("t", t3)
  console.log("value", value)

  console.log(getSeparator(value));

  const processedValue = () => {
    if (defaultDateFormat) return value;
    if (defaultFormat && !defaultSeparator) {

    }
  }

  const closeModal = () => setShowDateFormat(false);

  return (
      <>
        <ShowValues label={ label } displayValue={ formated }/>
        <Modal open={ showDateFormat }
               onRequestClose={ closeModal }
               onRequestSubmit={ closeModal }
               aria-label="Chose date format"
               closeButtonLabel="Close"
               modalHeading="Choose the date format"
               primaryButtonText="Close"
               size="sm"
        >
          <DateFormatPicker format={ format }
                            separator={ separator }
                            setDateFormat={ setDateFormat }
          />
        </Modal>
      </>
  )
}

export default ShowDate;