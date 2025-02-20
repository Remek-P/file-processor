import ShowValues from "@/components/output/show-metrics/show-values";
import dayjs from "dayjs";
import DateFormatPicker from "@/components/output/show-metrics/date-format-picker";
import { useMemo, useState } from "react";
import { Modal } from "@carbon/react";
import { SortAscending, SortDescending } from "@carbon/react/icons";
import classes from "@/components/output/output.module.scss";
import ActionToggle from "@/components/output/action-toggle/action-toggle";
import { detectDateFormat } from "@/utils/dateUtils";

function ShowDate({ value, label, showDateFormat, setShowDateFormat }) {

  const [ dateFormat, setDateFormat ] = useState("default");
  const [ sortDate, setSortDate ] = useState(undefined);

  const detectedDateFormat = useMemo(() => detectDateFormat(value), [value]);

  const formatted = ( dateFormat === "default" || detectedDateFormat === null )
      ? value
      : dayjs(value, detectedDateFormat).format(dateFormat.toString());

  const closeModal = () => setShowDateFormat(false);

  const sortValues = () => {
    setSortDate(prevState => !prevState);
  }
//TODO: Modal on mobile is a disgrace
  return (
      <>
        <ShowValues label={ label } displayValue={ formatted }/>
        <Modal open={ showDateFormat }
               onRequestClose={ closeModal }
               onRequestSubmit={ closeModal }
               aria-label="Chose date format"
               closeButtonLabel="Close"
               modalHeading="Choose the date format"
               primaryButtonText="Close"
               size="sm"
        >
          <div className={classes.showDateModalContainer}>

            <ActionToggle onClick={sortValues} description={!sortDate ? "Sort Ascending" : "Sort Descending"}>
              {!sortDate
                  ? <SortAscending className={classes.iconFill} aria-label="Sort Ascending" />
                  : <SortDescending className={classes.iconFill} aria-label="Sort Descending" />}
            </ActionToggle>

            <DateFormatPicker sortDate={ sortDate }
                              setDateFormat={ setDateFormat }
            />

          </div>
        </Modal>
      </>
  )
}

export default ShowDate;