import { useState } from "react";

import Head from "next/head";
import ChooseFile from "@/components/choose-file-screen/choose-file";

import { Loading } from '@carbon/react';

import XLSX from "xlsx";
import FileChosen from "@/components/file-chosen/file-chosen";

export default function Home() {

  const [excelFileName, setExcelFileName] = useState(null);
  const [excelFile, setExcelFile] = useState(null);

  const readExcel = (data) => {

    const workbook = XLSX.readFile(data, {
      sheetRows: 5,
    })

    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, {
      header: 1,
    })

    setExcelFile(jsonData);
  }

  const handleFile = async (e) => {

    setExcelFile(null);

    setExcelFileName(e.target.files[0].name);
    const excelFile = e.target.files[0];
    const data = await excelFile.arrayBuffer();

    readExcel(data);
  }

  const handleFileChange = () => {
    setExcelFile(null);
    setExcelFileName(null);
  }

  return (
    <>
      <Head>
        <title>Deep Insight Discovery</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>

        {
          !excelFileName && <ChooseFile onChange={handleFile} />
        }

        {
          !excelFile && excelFileName && <Loading active={true} />
        }

        {
          excelFile && <FileChosen excelFile={excelFile} handleFileChange={handleFileChange} />
        }

      </main>
    </>
  );
}
