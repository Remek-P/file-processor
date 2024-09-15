import {useContext, useState} from "react";

import {FileDataGlobalContext, ToggleIDViewProvider} from "@/context/global-context";

import ChooseFile from "@/components/choose-file-screen/choose-file";
import FileChosen from "@/components/file-chosen/file-chosen";

import {addData, getData } from "@/utils/create-indexedDB";
import {sheetToJsonData} from "@/utils/xlsxUtils";

import TexTile from "@/components/tile-type/text-tile/texTile";

import XLSX from "xlsx";

import { Loading } from '@carbon/react';

import { HEADER_LABEL, ID_LABEL } from "@/constants/constants";

export default function HomePage() {

  const {
    file,
    fileName,
    isLoading,
    warnings,
    addWarnings,
    isDataFetched,
    setFile,
    setFileName,
    setLoading,
  } = useContext(FileDataGlobalContext);

  const [finalDataAvailable, setFinalDataAvailable] = useState(false);
  
  const showWarnings = warnings.length !== 0;

//TODO: deal with finding dates

  const isIndexedDBSupported = () => {
    return 'indexedDB' in window;
  }

  const handleFile = async (e) => {

    setLoading(true);
    setFile(null);

    const targetFile = e.target.files[0];
    const targetFileName = targetFile.name;
    setFileName(targetFileName);

    const fileExtension = targetFileName.split('.').pop().toLowerCase();

    const handleFileWorker = async (workerData) => {
      const worker = new Worker(new URL("@/public/fileWorker", import.meta.url));

      worker.postMessage({ file: workerData });

      worker.onmessage = (event) => {
        if (event.data.status === "success") {
          setFile(event.data.data);
        } else if (event.data.status === "error") {
          addWarnings(event.data.message);
        }
        worker.terminate();
        setLoading(false);
      };
    }

    if (["xls", "xlsx", "csv"].includes(fileExtension)) {
      const data = await targetFile.arrayBuffer();

      await handleFileWorker(data);

    } else if (["zip"].includes(fileExtension)) {
// TODO: need a lib to handle .rar files
      await handleFileWorker(targetFile);

    } else {
      addWarnings("Unsupported file format");
      setLoading(false);
    }

    isDataFetched(false)
  };

  const fetchDataFromDB = async () => {
    setLoading(true);


    const partialDataArray = [];

    try {
      let chunk = 1;
      const res = await fetch(`/api/mongoDB_Chunks`); // fetching with limit
      const result = await res.json();
      partialDataArray.push(...result.data);

      //TODO: make it based on the size
      if (result.totalDocuments > 200000) addWarnings([...warnings, "The data exceeds size limit"])

      // If data in DB exceeds 10000 records, the while function will fetch the rest
      while (result.totalDocuments > partialDataArray.length) {
        chunk += 1
        const res = await fetch(`/api/mongoDB_Chunks?page=${chunk}`); // fetching with limit
        const result = await res.json();
        partialDataArray.push(...result.data);
      }
    } catch (error) {
      addWarnings([...warnings, "Fetching data failed"])
      setLoading(false);
    }

    try {
      const sheet = XLSX.utils.json_to_sheet(partialDataArray);
      const jsonData = sheetToJsonData(sheet);

      // Need to delete the first column, because it served as the base for key creation for MongoDb
      jsonData.shift();
      // // Two below indices are the ids from MongoDB
      jsonData[0][0] = HEADER_LABEL;
      jsonData[1][0] = ID_LABEL;

      setFile(jsonData);
      // for refetching
      const checkFileName = fileName ? fileName : "DB_file"
      setFileName(checkFileName)
      isDataFetched(true);

    } catch (error) {
      addWarnings([...warnings, "Incorrect file structure"])
    } finally {
      setLoading(false);
    }
  }

  const loadSavedFile = async (name) => {
    const file = await getData(name);
    if (file) {
      setFile(file);
      setFileName(name);
      setFinalDataAvailable(true);
    }
  };

  const handleFileChange = () => {
    setLoading(true);
    setFile(null);
    setFileName(null);
    setLoading(false);
    isDataFetched(undefined)
    setFinalDataAvailable(false);
  }

  const refreshData = async () => {
    await fetchDataFromDB();
    await addData(fileName, file);
  }

  return (
      <main>
        <ToggleIDViewProvider>

          <Loading id="indexLoading"
                   small={false}
                   withOverlay={true}
                   className={null}
                   description="Active loading indicator"
                   active={isLoading}
          />

          {
              !finalDataAvailable
              && <ChooseFile file={file}
                             fetchDataFromDB={fetchDataFromDB}
                             handleFile={handleFile}
                             loadSavedFile={loadSavedFile}
              />
          }

          {
              showWarnings && warnings.map((warning, index) => {
                return <TexTile key={index} text={warning}/>;
              })
          }

          {
              warnings.length === 0 && finalDataAvailable &&
              <FileChosen file={file}
                          fileName={fileName}
                          handleFileChange={handleFileChange}
                          refreshData={refreshData}
              />
          }

        </ToggleIDViewProvider>
      </main>
  );
}
