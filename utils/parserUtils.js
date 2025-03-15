import { checkForNumber } from "@/utils/general";

export const isContainingSubheaders = (data) => !data[1].some(datum => checkForNumber(datum));

export const checkIsFirstObjectMadeOfStrings = (arr) => {
  return Object.values(arr[0]).every(value => typeof value === 'string');
}

export function filterOutTheDuplicates(originalArray, fetchedArray, index) {
  const seenIds = new Set();
  
  originalArray.forEach(subarray => seenIds.add(subarray[index]));  // ID is at index indicated by index

  // Filter fetchedArray by checking if the ID already exists in the seenIds set
  return fetchedArray.filter(subarray => {
    const id = subarray[index];  // ID is at index indicated by index
    if (seenIds.has(id)) {
      return false;
    } else {
      seenIds.add(id);
      return true;  // Keep this subarray
    }
  });
}


