import { readExcel } from "@/utils/xlsxUtils";

self.onmessage = async (e) => {
  const { file } = e.data;

  try {
    const jsonData = readExcel(file);
    self.postMessage({ status: "success", data: jsonData });
  } catch (error) {
    self.postMessage({ status: "error", message: error.message });
  }
};

