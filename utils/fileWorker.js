import XLSX from "xlsx";

self.onmessage = async (e) => {
  const { file, fileName } = e.data;

  try {
    // importScripts('https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.0/xlsx.full.min.js');
    const workbook = XLSX.read(file, { type: "binary" });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, {
      header: 1,
      raw: false,
      rawNumbers: false,
    });
    self.postMessage({ status: "success", data: jsonData });
  } catch (error) {
    self.postMessage({ status: "error", message: error.message });
  }
};

