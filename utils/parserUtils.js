import { checkForNumber } from "@/utils/general";

export const isContainingSubheaders = (data) => !data[1].some(datum => checkForNumber(datum));

export const checkIsFirstObjectMadeOfStrings = (arr) => {
  return Object.values(arr[0]).every(value => typeof value === 'string');
}

