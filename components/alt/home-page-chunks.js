import { useState } from "react";

import { ToggleIDViewProvider } from "@/context/global-context";

import ChooseFile from "@/components/choose-file-screen/choose-file";
import FileChosen from "@/components/file-chosen/file-chosen";

import TexTile from "@/components/tile-type/text-tile/texTile";

import { Loading } from '@carbon/react';

import { headerLabel, idLabel } from "@/constants/constants";
import XLSX from "xlsx";

export default function HomeChunks() {

  const [excelFileName, setExcelFileName] = useState(null);
  const [excelFile, setExcelFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetched, setIsFetched] = useState(null);
  const [warnings, setWarnings] = useState([]);

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
    if (isMerged) setWarnings([...warnings, "Merged Cells detected, please unmerge them in the file"])
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];

    setExcelFile(sheetTOJsonData(worksheet));
  }

  const handleFile = async (e) => {

    setIsLoading(true);
    setExcelFile(null);

    setExcelFileName(e.target.files[0].name);
    const excelFile = e.target.files[0];
    const data = await excelFile.arrayBuffer();

    readExcel(data);
    setIsFetched(false);
    setIsLoading(false);
  }

  const fetchDataFromDB = async () => {
    setIsLoading(true);

    let chunk = 1;
    const partialDataArray = [];
    const res = await fetch(`/api/mongoDB_Chunks`); // fetching with limit
    const result = await res.json();
    partialDataArray.push(...result.data);

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
      setExcelFile(jsonData);
      setExcelFileName("DB_file")
      setIsFetched(true);
      setIsLoading(false);
    } else {
      setWarnings([...warnings, "Fetching data failed"])
    }
  }

  const handleFileChange = () => {
    setIsLoading(true);
    setExcelFile(null);
    setExcelFileName(null);
    setIsLoading(false);
  }

  const refreshData = async () => {
    await fetchDataFromDB();
  }

  return (
        <main>
            <ToggleIDViewProvider>

              {
                  !excelFileName && <ChooseFile handleFile={handleFile} fetchDataFromDB={fetchDataFromDB}/>
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
                  excelFile && warnings.length === 0 &&
                  <FileChosen excelFile={excelFile}
                              handleFileChange={handleFileChange}
                              refreshData={refreshData}
                              isFetched={isFetched}
                  />
              }

            </ToggleIDViewProvider>
        </main>
  );
}