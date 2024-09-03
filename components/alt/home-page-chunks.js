import { useContext } from "react";

import {FileDataGlobalContext, ToggleIDViewProvider} from "@/context/global-context";

import ChooseFile from "@/components/choose-file-screen/choose-file";
import FileChosen from "@/components/file-chosen/file-chosen";

import TexTile from "@/components/tile-type/text-tile/texTile";

import { Loading } from '@carbon/react';

import { headerLabel, idLabel } from "@/constants/constants";

import XLSX from "xlsx";

export default function HomeChunks() {

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
  
  const showWarnings = warnings.length !== 0;

  const sheetTOJsonData = (obj) => {
    return XLSX.utils.sheet_to_json(obj, {
      header: 1,
      raw: false,
      rawNumbers: false,
    })
  }
//TODO: deal with finding dates
  const readExcel = (data) => {

    const workbook = XLSX.readFile(data,
        // {sheetRows: 10}
    );
    const isMerged = workbook.Sheets.import?.["!merges"] !== undefined;
    if (isMerged) addWarnings([...warnings, "Merged Cells detected, please unmerge them in the file"])
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];

    setFile(sheetTOJsonData(worksheet));
  }

  const handleFile = async (e) => {

    setLoading(true);
    setFile(null);

    setFileName(e.target.files[0].name);
    const excelFile = e.target.files[0];
    const data = await excelFile.arrayBuffer();

    readExcel(data);
    isDataFetched(false);
    setLoading(false);

    console.log("fileName", fileName)
  }

  const fetchDataFromDB = async () => {
    setLoading(true);

    // Initial fetch, without chunking
    let chunk = 1;
    const partialDataArray = [];
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

    if (result.totalDocuments === partialDataArray.length) {
      const sheet = XLSX.utils.json_to_sheet(partialDataArray);
      const jsonData = sheetTOJsonData(sheet);

      // Need to delete the first column, because it served as the base for key creation for MongoDb
      jsonData.shift();
      // // Two below indices are the ids from MongoDB
      jsonData[0][0] = headerLabel;
      jsonData[1][0] = idLabel;
      setFile(jsonData);
      setFileName("DB_file")
      isDataFetched(true);
      setLoading(false);
    } else {
      addWarnings([...warnings, "Fetching data failed"])
    }
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
              !fileName && <ChooseFile handleFile={handleFile} fetchDataFromDB={fetchDataFromDB}/>
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
                return <TexTile key={index} text={warning}/>;
              })
          }

          {
              file && warnings.length === 0 &&
              <FileChosen file={file}
                          handleFileChange={handleFileChange}
                          refreshData={refreshData}
              />
          }

        </ToggleIDViewProvider>
      </main>
  );
}
