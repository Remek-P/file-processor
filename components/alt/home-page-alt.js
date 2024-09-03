import {useContext, useEffect} from "react";

import {FileDataGlobalContext, ToggleIDViewProvider} from "@/context/global-context";

import ChooseFile from "@/components/choose-file-screen/choose-file";
import FileChosen from "@/components/file-chosen/file-chosen";

import TexTile from "@/components/tile-type/text-tile/texTile";

import { Loading } from '@carbon/react';

import { headerLabel, idLabel } from "@/constants/constants";
import XLSX from "xlsx";
import JSZip from "jszip";

export default function HomePageAlt() {

  const {
    state: {
      file,
      fileName,
      isLoading,
      savedFiles,
      warnings,
    },
    addWarnings,
    isDataFetched,
    loadFromLocalStorage,
    saveToLocalStorage,
    setFile,
    setFileName,
    setLoading,
  } = useContext(FileDataGlobalContext);

  const showWarnings = warnings.length !== 0;

  const sheetToJsonData = (obj) => {
    return XLSX.utils.sheet_to_json(obj, {
      header: 1,
      raw: false,
      rawNumbers: false,
    })
  }

  const saveFile = (name, data) => {
    saveToLocalStorage({ name, data });
  };


  const readExcel = (data) => {

    // const workbook = XLSX.readFile(data,
    //     // {sheetRows: 10}
    // );
    try {
      const workbook = XLSX.read(data, {type: "binary"});

      const isMerged = workbook.Sheets.import?.["!merges"] !== undefined;
      if (isMerged) addWarnings("Merged Cells detected, please unmerge them in the file")

      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      setFile(sheetToJsonData(worksheet));
    } catch (error) {
      addWarnings("Error while processing file"+ error.message);
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
      const worker = new Worker("../utils/fileWorker.js");

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
    } else if (fileExtension === "zip" || fileExtension === "rar") {
      if (fileExtension === "zip" || fileExtension === "rar") {
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
        setLoading(false);
      }
    }
    isDataFetched(false)
    setLoading(false);
  };

  const loadSavedFile = (name) => {
    const file = savedFiles.find(f => f.name === name);
    if (file) {
      setFile(file.data);
      setFileName(name);
    }
  };
  useEffect(() => {
    const saved = localStorage.getItem('savedFiles');
    if (saved) {
      loadFromLocalStorage(JSON.parse(saved));
    }
  }, []);


  const fetchDataFromDB = async () => {
    setLoading(true);

    const res = await fetch("/api/mongoDB");
    const data = await res.json();
    const sheet = XLSX.utils.json_to_sheet(data);
    const jsonData = sheetToJsonData(sheet);

    // Need to delete the first column, because it served as the base for key creation for MongoDb
    jsonData.shift();
    // Two below indices are the ids from MongoDB
    jsonData[0][0] = headerLabel;
    jsonData[1][0] = idLabel;
    setFile(jsonData);
    setFileName("DB_file")
    isDataFetched(true);
    setLoading(false);
    console.log("fetchDataFromDB", fileName)
  }


  const handleFileChange = () => {
    setLoading(true);
    setFile(null);
    setFileName(null);
    setLoading(false);
  }

  const refreshData = async () => {
    await fetchDataFromDB();
  }

  return (
      <main>
        <ToggleIDViewProvider>

          {
            <ChooseFile file={file}
                        fetchDataFromDB={fetchDataFromDB}
                        handleFile={handleFile}
                        loadSavedFile={loadSavedFile}
                        saveFile={saveFile}
                        savedFiles={savedFiles}
            />

          }

          <Loading id="indexLoading"
                   small={false}
                   withOverlay={true}
                   className={null}
                   description="Active loading indicator"
                   active={isLoading}
          />

          {
              showWarnings && warnings.map((warning, index) => {
                return <TexTile key={index} text={warning} />;
              })
          }

          {
              file &&
              <FileChosen file={file} fileName={fileName} refreshData={refreshData} />
          }

        </ToggleIDViewProvider>
      </main>
  );
}
