import XLSX from "xlsx";
import * as cpexcel from 'xlsx/dist/cpexcel.full.mjs';
XLSX.set_cptable(cpexcel);

export const sheetToJsonData = (obj) => {
  return XLSX.utils.sheet_to_json(obj, {
    header: 1,
    raw: false,
    rawNumbers: false,
    blankrows: false,
  })
}

export const readExcel = (data) => {
  const workbook = XLSX.read(data, {
    type: "binary",
    codepage: 65001, // UTF-8 encoding
    raw: false,
    // cellText: true,
    // WTF: true // Forces XLSX to be more lenient with abnormal files
  });

  const isMerged = workbook.Sheets.import?.["!merges"] !== undefined;
  if (isMerged) throw Error(`Merged cells detected, please unmerge them in the source file`);

  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  return sheetToJsonData(worksheet);
};

