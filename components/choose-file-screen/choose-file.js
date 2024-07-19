import {FileUploader, Tile} from "@carbon/react";

import classes from "./choose-file.module.scss";

function ChooseFile({ onChange }) {

  // const [fetchedData, setFetchedData] = useState([])
  //
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await fetch("/api/hello");
  //     const data = await res.json();
  //     setFetchedData(data);
  //   }
  //   fetchData();
  // }, []);
  //
  // console.log("fetchedData", fetchedData)

  return (
      <div className={`${classes.container} shadow`}>
        <Tile className={classes.tile}>
          <FileUploader filenameStatus="complete"
                        labelTitle="Please choose a file to upload"
                        labelDescription="Only Excel files will be accepted"
                        buttonLabel="Upload"
                        buttonKind="primary"
                        onChange={onChange}
                        accept={[
                            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                          ".xlsx",
                          ".xls"]}
          />
        </Tile>
      </div>
  );
}

export default ChooseFile;