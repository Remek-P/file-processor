import {generalWorker, HEADER_LABEL} from "@/constants/constants";
import {convertUnderscoreToSpace} from "@/utils/general";

self.onmessage = (e) => {
  const { task, args } = e.data;  // Destructure task type and arguments
  let result;

  switch (task) {
    case generalWorker.filter:
      result = filterData(...args);
      break;

     case generalWorker.hideAllData:
      result = hideAllDataFunc(...args);
      break;

    default:
      result = { error: "Invalid task type" };
  }

  self.postMessage(result);
};

const filterData = (array, filterValue) => array.filter(item => item !== filterValue);

const hideAllDataFunc = (headers, toggleIDView) => {
  const uniqueHeaders = [...(new Set(headers))];
  const refinedUniqueHeaders = convertUnderscoreToSpace(uniqueHeaders);
  const headersToHide = toggleIDView
      ? refinedUniqueHeaders
      : refinedUniqueHeaders.filter(header => header !== HEADER_LABEL);

  return [...(new Set(headersToHide))];
}

