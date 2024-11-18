import XLSX from 'xlsx';
import { checkForNumber } from "@/utils/sortUtils";

// TODO: make implementation of this (1 or 2 headers)

// const isContainingSubheaders = (rows) => {
//   const secondRow = rows[1];
//   // Check if second row is a subheader
//   return secondRow && secondRow.some(cell => !isNaN(cell));
// };
//
// export const parseFile = (file, callback) => {
//   const reader = new FileReader();
//
//   reader.onload = (e) => {
//     const data = new Uint8Array(e.target.result);
//     const workbook = XLSX.read(data, { type: 'array' });
//     const sheet = workbook.Sheets[workbook.SheetNames[0]];
//     const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });
//
//     // Detect if containing subheaders
//     if (isContainingSubheaders(rows)) {
//       // Contains subheaders
//       const headers = rows.slice(0, 2);
//       const data = rows.slice(2);
//       callback({ headers, data });
//     } else {
//       // Does not contain subheaders or more than 2 (the latter is unsupported)
//       const headers = rows[0];
//       const data = rows.slice(1);
//       callback({ headers, data });
//     }
//   };
//
//   reader.readAsArrayBuffer(file);
// };

export const isContainingSubheaders = (data) => !data[1].some(datum => checkForNumber(datum));

export const parseHeaders = (data) => {
  return isContainingSubheaders(data) === true
      ? [data[0], data[1]]
      : data[0];
}

export const parseDataArray = (data) => {
  return isContainingSubheaders(data) === true
      ? data.slice(2)
      : data.slice(1);
}