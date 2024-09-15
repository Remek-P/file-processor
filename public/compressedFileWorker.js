import JSZip from "jszip";

import { readExcel } from "@/utils/xlsxUtils";


self.onmessage = async (e) => {
  const { file } = e.data;

  try {
    const zip = new JSZip();
    const content = await zip.loadAsync(file);
    const files = Object.keys(content.files);
    const firstFile = files.find(extension => /\.(xls|xlsx|csv)$/.test(extension));
    if (firstFile) {
      const firstFileData = await content.files[firstFile].async("binarystring");

      const jsonData = readExcel(firstFileData);

      self.postMessage({ status: "success", data: jsonData });

    } else {
      throw new Error("Failed to extract the file");
    }
  } catch (error) {
    self.postMessage({ status: "error", message: error.message });
  }
}