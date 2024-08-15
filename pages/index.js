import { useState } from "react";

import Head from "next/head";

import ChooseFile from "@/components/choose-file-screen/choose-file";
import FileChosen from "@/components/file-chosen/file-chosen";

import { Loading } from '@carbon/react';

import { headerLabel, idLabel } from "@/constants/constants";

import XLSX from "xlsx";

export default function Home() {

  const [excelFileName, setExcelFileName] = useState(null);
  const [excelFile, setExcelFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetched, setIsFetched] = useState(null)

  const readExcel = (data) => {

    const workbook = XLSX.readFile(data,
        {sheetRows: 10}
    );
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, {
      header: 1,
    })
    setExcelFile(jsonData);
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

    const res = await fetch("/api/mongoDB");
    const data = await res.json();
    const sheet = XLSX.utils.json_to_sheet(data);
    const jsonData = XLSX.utils.sheet_to_json(sheet, {
      header: 1,
    });

    // Need to delete the first column, because it served as the base for key creation for MongoDb
    jsonData.shift()
    // Two below indices are the ids from MongoDB
    jsonData[0][0] = headerLabel;
    jsonData[1][0] = idLabel;
    setExcelFile(jsonData);
    setExcelFileName("DB_file")
    setIsFetched(true);
    setIsLoading(false);
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
    <>
      <Head>
        <title>Deep Insight Discovery</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.jpg" />
      </Head>

      <main>

        {
          !excelFileName && <ChooseFile handleFile={handleFile} fetchDataFromDB={fetchDataFromDB} />
        }

        <Loading id="indexLoading"
                 small={false}
                 withOverlay={true}
                 className={null}
                 description="Active loading indicator"
                 active={isLoading}
        />

        {
          excelFile &&
            <FileChosen excelFile={excelFile}
                        handleFileChange={handleFileChange}
                        refreshData={refreshData}
                        isFetched={isFetched}
            />
        }

      </main>
    </>
  );
}
