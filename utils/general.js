import { excludedLabelsFromComputingArray } from "@/constants/constants";

export const checkForNumber = (data) => !isNaN(+data);
export const checkForString = (data) => typeof data === "string";
export const decimalPlaceSeparatorToComma = (data) => data.includes(",") ? data.replace(",",".") : data;

export const convertUnderscoreToSpace = (array) => {
  return array.map(item => {
    if(item === "_id") return item;

    if (typeof item === "string") return item.replace(/_/g, ' ');
    else return item;
  });
}

export const isContainingItemFromArray = (item, arr) => {
  return arr.some(obj => obj.id === item);
}

export const labelForEarlyReturn = label => {
  return excludedLabelsFromComputingArray.some(item =>
      item.toLowerCase() === label.toLowerCase());
}

export const findDuplicatesIn1DArray = (arr) => {
  const frequency = {};
  const duplicates = [];

  for (const item of arr) {
    if (frequency[item] === undefined) frequency[item] = 1;
    else frequency[item]++;
  }

  // Find items that occur more than once
  for (const [item, count] of Object.entries(frequency)) {
    if (count > 1) duplicates.push(item);
  }

  return duplicates;
}