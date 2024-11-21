import { checkForNumber } from "@/utils/sortUtils";

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