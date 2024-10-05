// import XLSX from 'xlsx';
//
// // TODO: make implementation of this (1 or 2 headers)
//
// const isTwoRowHeader = (rows) => {
//   // const firstRow = rows[0];
//   const secondRow = rows[1];
//   // Prosty warunek, np. sprawdzający, czy drugi wiersz nie zawiera liczb (co sugeruje, że jest nagłówkiem)
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
//     // Parsowanie danych
//     const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });
//
//     // Rozpoznawanie liczby wierszy nagłówków
//     if (isTwoRowHeader(rows)) {
//       const headers = rows.slice(0, 2);  // Dwa wiersze nagłówków
//       const data = rows.slice(2);  // Dane zaczynają się od 3. wiersza
//       callback({ headers, data });
//     } else {
//       const headers = rows[0];  // Jeden wiersz nagłówków
//       const data = rows.slice(1);  // Dane zaczynają się od 2. wiersza
//       callback({ headers, data });
//     }
//   };
//
//   reader.readAsArrayBuffer(file);
// };
