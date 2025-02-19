import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

export const dateFormats = [
  "YYYY-MMMM-DD",       // 2023-10-15
  "YYYY/MMMM/DD",       // 2023/10/15
  "YYYY MMMM DD",       // 2023 10 15
  "YYYY.MMMM.DD",       // 2023.10.15
  "YYYY-MMMM-D",       // 2023-10-15
  "YYYY/MMMM/D",       // 2023/10/15
  "YYYY MMMM D",       // 2023 10 15
  "YYYY.MMMM.D",       // 2023.10.15
  "YYYY-MMM-DD",       // 2023-10-15
  "YYYY/MMM/DD",       // 2023/10/15
  "YYYY MMM DD",       // 2023 10 15
  "YYYY.MMM.DD",       // 2023.10.15
  "YYYY-MMM-D",       // 2023-10-15
  "YYYY/MMM/D",       // 2023/10/15
  "YYYY MMM D",       // 2023 10 15
  "YYYY.MMM.D",       // 2023.10.15
  "YYYY-MM-DD",       // 2023-10-15
  "YYYY/MM/DD",       // 2023/10/15
  "YYYY MM DD",       // 2023 10 15
  "YYYY.MM.DD",       // 2023.10.15
  "YYYY-MM-D",       // 2023-10-15
  "YYYY/MM/D",       // 2023/10/15
  "YYYY MM D",       // 2023 10 15
  "YYYY.MM.D",       // 2023.10.15
  "YYYY-M-DD",       // 2023-1-15
  "YYYY/M/DD",       // 2023/1/15
  "YYYY M DD",       // 2023 1 15
  "YYYY.M.DD",       // 2023.1.15
  "YYYY-M-D",       // 2023-1-5
  "YYYY/M/D",       // 2023/1/5
  "YYYY M D",       // 2023 1 5
  "YYYY.M.D",       // 2023.1.5
  "MMMM-DD-YYYY",       // 10-15-2023
  "MMMM/DD/YYYY",       // 10/15/2023
  "MMMM DD YYYY",       // 10 15 2023
  "MMMM.DD.YYYY",       // 10.15.2023
  "MMMM-D-YYYY",       // 10-15-2023
  "MMMM/D/YYYY",       // 10/15/2023
  "MMMM D YYYY",       // 10 15 2023
  "MMMM.D.YYYY",       // 10.15.2023
  "MMM-DD-YYYY",       // 10-15-2023
  "MMM/DD/YYYY",       // 10/15/2023
  "MMM DD YYYY",       // 10 15 2023
  "MMM.DD.YYYY",       // 10.15.2023
  "MMM-D-YYYY",       // 10-15-2023
  "MMM/D/YYYY",       // 10/15/2023
  "MMM D YYYY",       // 10 15 2023
  "MMM.D.YYYY",       // 10.15.2023
  "MM-DD-YYYY",       // 10-15-2023
  "MM/DD/YYYY",       // 10/15/2023
  "MM DD YYYY",       // 10 15 2023
  "MM.DD.YYYY",       // 10.15.2023
  "MM-D-YYYY",       // 10-5-2023
  "MM/D/YYYY",       // 10/5/2023
  "MM D YYYY",       // 10 5 2023
  "MM.D.YYYY",       // 10.5.2023
  "M-DD-YYYY",       // 1/15/2023
  "M DD YYYY",       // 1/15/2023
  "M.DD.YYYY",       // 1/15/2023
  "M/DD/YYYY",       // 1/15/2023
  "M-DD-YY",       // 1/15/23
  "M DD YY",       // 1/15/23
  "M.DD.YY",       // 1/15/23
  "M/DD/YY",       // 1/15/23
  "DD-MMMM-YYYY",       // 15-10-2023
  "DD/MMMM/YYYY",       // 15/10/2023
  "DD MMMM YYYY",       // 15 10 2023
  "DD.MMMM.YYYY",       // 15.10.2023
  "DD-MMM-YYYY",       // 15-10-2023
  "DD/MMM/YYYY",       // 15/10/2023
  "DD MMM YYYY",       // 15 10 2023
  "DD.MMM.YYYY",       // 15.10.2023
  "DD-MM-YYYY",       // 15-10-2023
  "DD/MM/YYYY",       // 15/10/2023
  "DD MM YYYY",       // 15 10 2023
  "DD.MM.YYYY",       // 15.10.2023
  "D-MMMM-YYYY",       // 15-10-2023
  "D/MMMM/YYYY",       // 15/10/2023
  "D MMMM YYYY",       // 15 10 2023
  "D.MMMM.YYYY",       // 15.10.2023
  "D-MMM-YYYY",       // 15-10-2023
  "D/MMM/YYYY",       // 15/10/2023
  "D MMM YYYY",       // 15 10 2023
  "D.MMM.YYYY",       // 15.10.2023
  "D-MM-YYYY",       // 15-10-2023
  "D/MM/YYYY",       // 15/10/2023
  "D MM YYYY",       // 15 10 2023
  "D.MM.YYYY",       // 15.10.2023
  "YY-MMMM-DD",       // 23-10-15
  "YY/MMMM/DD",       // 23/10/15
  "YY MMMM DD",       // 23 10 15
  "YY.MMMM.DD",       // 23.10.15
  "YY-MMMM-D",       // 23-10-15
  "YY/MMMM/D",       // 23/10/15
  "YY MMMM D",       // 23 10 15
  "YY.MMMM.D",       // 23.10.15
  "YY-MMM-DD",       // 23-10-15
  "YY/MMM/DD",       // 23/10/15
  "YY MMM DD",       // 23 10 15
  "YY.MMM.DD",       // 23.10.15
  "YY-MMM-D",       // 23-10-15
  "YY/MMM/D",       // 23/10/15
  "YY MMM D",       // 23 10 15
  "YY.MMM.D",       // 23.10.15
  "YY-MM-DD",       // 23-10-15
  "YY/MM/DD",       // 23/10/15
  "YY MM DD",       // 23 10 15
  "YY.MM.DD",       // 23.10.15
  "YY-MM-D",       // 23-10-15
  "YY/MM/D",       // 23/10/15
  "YY MM D",       // 23 10 15
  "YY.MM.D",       // 23.10.15
  "YY-M-DD",       // 23-1-15
  "YY/M/DD",       // 23/1/15
  "YY M DD",       // 23 1 15
  "YY.M.DD",       // 23.1.15
  "YY-M-D",       // 23-1-5
  "YY/M/D",       // 23/1/5
  "YY M D",       // 23 1 5
  "YY.M.D",       // 23.1.5
  "YYYY-MM-DD HH:mm", // 2023-10-15 14:30
  "YYYY/MM/DD HH:mm", // 2023/10/15 14:30
  "YYYY MM DD HH:mm", // 2023 10 15 14:30
  "YYYY.MM.DD HH:mm", // 2023.10.15 14:30
  "YYYY-MM-DD HH:mm:ss", // 2023-10-15 14:30 30:00
  "YYYY/MM/DD HH:mm:ss", // 2023/10/15 14:30 30:00
  "YYYY MM DD HH:mm:ss", // 2023 10 15 14:30 30:00
  "YYYY.MM.DD HH:mm:ss", // 2023.10.15 14:30 30:00
  "YYYY-MM-DD HH:mm:ss.SSS", // 2023-10-15 14:30:00.000
  'YYYY-MM-DDTHH:mm:ss.SSS[Z]', // 2023-10-15 14:30:00.000[Z]
  'YYYY-MM-DDTHH:mm:ss.SS[Z]', // 2023-10-15 14:30:00.0[Z]
  'YYYY-MM-DDTHH:mm:ss.S[Z]', // 2023-10-15 14:30:00.0[Z]
  "YYYY-MM-DDTHH:mm:ss[Z]", // 2023-10-15T14:30:00Z
  "YYYY-MM-DDTHH:mm:ss", // 2023-10-15T14:30:00
  "dddd, MMMM D YYYY", // Thursday, October 5 2023

  "YYYY-MM-DDTHH:mm:ssZ", // 2023-10-15T14:30:00Z
  "YYYY/MM/DDTHH:mm:ssz", // 2023/10/15T14:30:00Z
  "YYYY MM DDTHH:mm:ss", // 2023 10 15T14:30:00
  "dddd, MMMM D YYYY", // Thursday, October 5 2023

  "ddd, MMMM D YYYY", // Thu, October 5 2023
  "dddd, MMMM DD YYYY", // Thursday, October 05 2023
  "ddd, MMMM DD YYYY", // Thu, October 05 2023
  "dddd, MMMM D YYYY", // Thursday October 5 2023
  "ddd, MMMM D YYYY", // Thu October 5 2023
  "dddd, MMMM DD YYYY", // Thursday, October 05 2023
  "ddd, MMMM DD YYYY", // Thu, October 05 2023
  "dddd, DD MMMM YYYY", // Thursday, 05 October 2023
  "ddd, DD MMMM YYYY", // Thu, 05 October 2023
  "dddd, D MMMM YYYY", // Tuesday, 20 June 2000
  "ddd, D MMMM YYYY", // Tue, 20 June 2000
  "dddd, MMMM D YYYY", // Thursday, October 5 2023
  "ddd, MMMM D YYYY", // Thu, October 5 2023
  "MMM D h:mm A",    // Oct 15, 2:30 PM
  "MMMM D YYYY",     // October 5, 2023
  "MMM D YYYY",      // Oct 5, 2023
  "MMMM D YY",     // October 5, 2023
  "MMM DD YY",      // Oct 5, 2023
  "MMMM DD YY",     // October 5, 2023
  "MMM D YY",      // Oct 5, 2023
  "D MMMM YYYY",      // 15 October 2023
];

// export const dateValidator = (dateString) => {
//
//   if (typeof dateString !== 'string') return false;
//
//   let validDate = null;
//
//   for (const format of dateFormats) {
//     const parsedDate = dayjs(dateString, format, true); // strict parsing
//     if (parsedDate.isValid()) {
//       validDate = parsedDate;
//       break;
//     }
//   }
//
//   if (validDate) return true;
//   else return false;
// };

export const dateValidator = (dateString) => {

  if (typeof dateString !== "string") return false

  return dayjs(dateString, dateFormats, true).isValid();

};

export function getSeparator(format) {
  const separators = format.split(/\w+/).filter(Boolean);
  return separators.length > 0 ? separators[0] : '';
}