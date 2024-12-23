import XLSX from "xlsx";

export const sheetToJsonData = (obj) => {
  return XLSX.utils.sheet_to_json(obj, {
    header: 1,
    raw: false,
    rawNumbers: false,
    blankrows: false,
  })
}

export const readExcel = (data) => {
    const workbook = XLSX.read(data,
        {
          type: "binary",
          // sheetRows: 10,
        }
    );
    const isMerged = workbook.Sheets.import?.["!merges"] !== undefined;
    if (isMerged) throw Error(`Merged cells detected, please unmerge them in the source file`);

    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    return sheetToJsonData(worksheet)
};