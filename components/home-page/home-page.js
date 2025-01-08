import {useContext, useEffect, useState} from "react";

import {
  FileDataGlobalContext,
  IsContainingSubheadersContext,
  ToggleIDViewProvider,
} from "@/context/global-context";

import ChooseFile from "@/components/choose-file-screen/choose-file";
import FileChosen from "@/components/file-chosen/file-chosen";
import FileChosenFallback from "@/components/file-chosen/error-boundary/file-chosen-fallback";
import TextTile from "@/components/tile-type/text-tile/textTile";
import ErrorBoundary from "@/components/error-boundary/error-boundary";

import { addData, deleteData, getData } from "@/utils/indexedDB";
import { sheetToJsonData } from "@/utils/xlsxUtils";
import { Loading } from '@carbon/react';

import XLSX from "xlsx";
import dayjs from "dayjs";

import { HEADER_LABEL, ID_LABEL } from "@/constants/constants";
import {checkIsFirstObjectMadeOfStrings, isContainingSubheaders} from "@/utils/parserUtils";


export default function HomePage() {

  const {
    file,
    fileName,
    isLoading,
    warnings,
    addWarnings,
    deleteWarning,
    isDataFetched,
    setFile,
    setFileName,
    setLoading,
  } = useContext(FileDataGlobalContext);
  const { isSubheaders, setIsSubheaders } = useContext(IsContainingSubheadersContext);

  const [ finalDataAvailable, setFinalDataAvailable ] = useState(false);
  const [ isDirectFetchResults, setIsDirectFetchResults ] = useState(false);
  const [ userQuery, setUserQuery ] = useState("");

  const showWarnings = warnings.length !== 0;

//TODO: deal with finding dates

  // const isIndexedDBSupported = () => {
  //   return 'indexedDB' in window;
  // }

  // Send task to chosen worker
  const handleFileWorker = async (worker, workerData) => {

    worker.postMessage({ file: workerData });

    worker.onmessage = (event) => {
      if (event.data.status === "success") {

        setFile(event.data.data);
      } else if (event.data.status === "error") {
        addWarnings(event.data.message);
      } else {
        throw new Error("Something went wrong");
      }
      worker.terminate();
      setLoading(false);
    };
  }

  const handleFile = async (e) => {

    setLoading(true);
    setFile(null);

    const targetFile = e.target.files[0];
    const targetFileName = targetFile.name;
    setFileName(targetFileName);

    const fileExtension = targetFileName.split('.').pop().toLowerCase();

    if (["xls", "xlsx", "csv"].includes(fileExtension)) {
      const data = await targetFile.arrayBuffer();

      const worker = new Worker(new URL("@/public/fileWorker", import.meta.url));

      await handleFileWorker(worker, data);

    } else if (["zip"].includes(fileExtension)) {
// TODO: need a lib to handle .rar files

      const worker = new Worker(new URL("@/public/compressedFileWorker", import.meta.url));

      await handleFileWorker(worker, targetFile);

    } else {
      addWarnings("Unsupported file format");
      setLoading(false);
    }

    isDataFetched(false)
  };

  const fetchDataFromDB = async (addToIndexedDB = false) => {
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

      const isSubheadersPresent = checkIsFirstObjectMadeOfStrings(partialDataArray);

      if (isSubheadersPresent) {
        setIsSubheaders(true);
        [jsonData[0], jsonData[1]] = [jsonData[1], jsonData[0]];
        jsonData[1][0] = ID_LABEL;
      }

      else {
        setIsSubheaders(false);
      }
      // // Two below indices are the ids from MongoDB
      jsonData[0][0] = HEADER_LABEL;

      setFile(jsonData);
      // for refetching
      const checkFileName = fileName ? fileName : `DB_file_${timeStamp()}`
      setFileName(checkFileName)
      isDataFetched(true);

      if (addToIndexedDB) {
        await addData(checkFileName, jsonData);
      }

    } catch (error) {
      addWarnings([...warnings, "Incorrect file structure"])
    } finally {
      setLoading(false);
    }
  }

  const fetchDirectlyDataFromS3 = async (query) => {
    setLoading(true);

    let result;
    setUserQuery(query);

    try {
      const res = await fetch(`/api/csvData?query=${query}`);
      result = await res.json();

      if (res.ok) {
        // Process and display the result
        const sheet = XLSX.utils.json_to_sheet(result);
        const jsonData = sheetToJsonData(sheet);

        setFile(jsonData);
        setFileName(`DB_file_${timeStamp()}`);
        isDataFetched(true);
        setIsDirectFetchResults(true);
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      addWarnings([...warnings, "Fetching data failed"]);
      console.error("Error fetching search results:", error);
      setIsDirectFetchResults(false);
    } finally {
      setLoading(false);
    }
  };

  const fetchDirectlyDataFromDB = async (query) => {
    setLoading(true);
    let result;
    setUserQuery(query);

    try {
      const res = await fetch(`/api/mongoDB?query=${query}`);
      result = await res.json();

      const sheet = XLSX.utils.json_to_sheet(result);
      const jsonData = sheetToJsonData(sheet);

      // Check if the JSON contains subheaders
      const isSubheadersPresent = isContainingSubheaders(jsonData);
      setIsSubheaders(isSubheadersPresent);

      if (isSubheadersPresent) {
        [jsonData[0], jsonData[1]] = [jsonData[1], jsonData[0]];
        jsonData[1][0] = ID_LABEL;
        setIsSubheaders(true);
      } else {
        jsonData.splice(1, 1);  // Remove the second row (if not subheaders)
        setIsSubheaders(false);
      }

      jsonData[0][0] = HEADER_LABEL;

      setFile(jsonData);
      const checkFileName = fileName || `DB_file_${timeStamp()}`;
      setFileName(checkFileName);

      isDataFetched(true);
      setIsDirectFetchResults(true);
    } catch (error) {
      addWarnings([...warnings, "Fetching data failed"]);
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };


  const loadSavedFile = async (name) => {
    setLoading(true);
    const file = await getData(name);
    if (file) {
      setFile(file);
      setFileName(name);
      setFinalDataAvailable(true);
    }
    setLoading(false);
  };

  const handleFileChange = () => {
    setLoading(true);
    setFile(null);
    setFileName(null);
    setUserQuery('')
    isDataFetched(undefined)
    setFinalDataAvailable(false);
    setIsDirectFetchResults(false);
    setLoading(false);
  }

  const handleErrorDelete = async () => {
    setLoading(true);
    await deleteData(fileName);
    setFile(null);
    setFileName(null);
    isDataFetched(undefined)
    setFinalDataAvailable(false);
    setIsDirectFetchResults(false);
    setLoading(false);
  }

  const refreshData = async (query) => {
    if (finalDataAvailable) await fetchDataFromDB(true);
    if (isDirectFetchResults) await fetchDirectlyDataFromDB(query);
  }

  const timeStamp = () => {
    return `${dayjs().format('YYYY-MM-DD HH:mm')}`;
  }

  useEffect(() => {
    file ? handleFileChange() : null;
  }, []);

  //TODO: error boundary to ChooseFile;

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
              !finalDataAvailable && !isDirectFetchResults &&
              <ErrorBoundary fallback={ <h1>Access denied</h1> }>
                <ChooseFile file={file}
                            fetchDataFromDB={fetchDataFromDB}
                            handleFile={handleFile}
                            loadSavedFile={loadSavedFile}
                            fetchDirectlyDataFromDB={fetchDirectlyDataFromDB}
                />
              </ErrorBoundary>
          }

          {
              showWarnings && warnings.map((warning, index) => {
                return <TextTile key={index} text={warning} handleClick={() => deleteWarning(index)} />;
              })
          }

          {
              warnings.length === 0
              && (finalDataAvailable || isDirectFetchResults)
              && isSubheaders !== undefined &&
              <ErrorBoundary fallback={ <FileChosenFallback syncAction={handleFileChange}
                                                            asyncAction={handleErrorDelete}
                                                            fileName={fileName} />
              }>
                <FileChosen file={file}
                            fileName={fileName}
                            userQuery={userQuery}
                            isDirectFetchResults={isDirectFetchResults}
                            handleFileChange={handleFileChange}
                            refreshData={refreshData}
                            fetchDirectlyDataFromDB={fetchDirectlyDataFromDB}
                            setUserQuery={setUserQuery}
                />
              </ErrorBoundary>

          }

        </ToggleIDViewProvider>
      </main>
  );
}
