import {useContext, useState} from "react";

import {FileDataGlobalContext, ToggleIDViewProvider} from "@/context/global-context";

import ChooseFile from "@/components/choose-file-screen/choose-file";
import FileChosen from "@/components/file-chosen/file-chosen";

import { getData } from "@/utils/create-indexedDB";

import TexTile from "@/components/tile-type/text-tile/texTile";

import { Loading } from '@carbon/react';

import { HEADER_LABEL, ID_LABEL } from "@/constants/constants";

import XLSX from "xlsx";
import JSZip from "jszip";

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

  const sheetToJsonData = (obj) => {
    return XLSX.utils.sheet_to_json(obj, {
      header: 1,
      raw: false,
      rawNumbers: false,
    })
  }

//TODO: deal with finding dates

  const readExcel = (data) => {

    try {
      const workbook = XLSX.read(data,
          {
            type: "binary",
            // sheetRows: 10,
          }
      );

      const isMerged = workbook.Sheets.import?.["!merges"] !== undefined;
      if (isMerged) addWarnings("Merged Cells detected, please unmerge them in the file")

      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      setFile(sheetToJsonData(worksheet));
    } catch (error) {
      addWarnings("Error while processing file");
    }
  };

  const handleFile = async (e) => {

    setLoading(true);
    setFile(null);

    const targetFile = e.target.files[0];
    const targetFileName = targetFile.name;
    setFileName(targetFileName);

    const fileExtension = targetFileName.split('.').pop().toLowerCase();

  if (["xls", "xlsx", "csv"].includes(fileExtension)) {
    const worker = new Worker(new URL("@/public/fileWorker", import.meta.url));

    worker.onmessage = (event) => {
      if (event.data.status === "success") {
        setFile(event.data.data);
      } else if (event.data.status === "error") {
        addWarnings("Error processing targetFile: " + event.data.message);
      }
      setLoading(false);
    };
    const data = await targetFile.arrayBuffer();
    worker.postMessage({ file: data, fileName: targetFileName });

  } else if (["rar", "zip"].includes(fileExtension)) {
      // TODO: Implement web worker
      const zip = new JSZip();
      const content = await zip.loadAsync(targetFile);
      const files = Object.keys(content.files);
      const firstFile = files.find(extension => /\.(xls|xlsx|csv)$/.test(extension));
      if (firstFile) {
        const firstFileData = await content.files[firstFile].async("binarystring");
        readExcel(firstFileData);
      }
  } else {
    addWarnings("Unsupported targetFile format");
  }

  isDataFetched(false)
  setLoading(false);
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
    } finally {
      const sheet = XLSX.utils.json_to_sheet(partialDataArray);
      const jsonData = sheetToJsonData(sheet);

      // Need to delete the first column, because it served as the base for key creation for MongoDb
      jsonData.shift();
      // // Two below indices are the ids from MongoDB
      jsonData[0][0] = HEADER_LABEL;
      jsonData[1][0] = ID_LABEL;
      setFile(jsonData);
      setFileName("DB_file")
      isDataFetched(true);
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

  function isIndexedDBSupported() {
    // Check if the browser supports IndexedDB
    return 'indexedDB' in window;
  }

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
  }

  return (
      <main>
        <ToggleIDViewProvider>

          {!finalDataAvailable
              && <ChooseFile file={file}
                             fetchDataFromDB={fetchDataFromDB}
                             handleFile={handleFile}
                             loadSavedFile={loadSavedFile}
              />}

          <Loading id="indexLoading"
                   small={false}
                   withOverlay={true}
                   className={null}
                   description="Active loading indicator"
                   active={isLoading}
          />

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
