export const DB_NAME = 'FileDatabase';
export const STORE_NAME = 'FileStore';
export const COLLECTION = 'data-to-JS';
// export const COLLECTION = 'big-file';

export const HEADER_LABEL = "MongoDB ID";
export const ID_LABEL = "_id";

export const CASE_NAME = {
  SET_LOADING: "SET_LOADING",
  SET_FILE: "SET_FILE",
  SET_FILE_NAME: "SET_FILE_NAME",
  ADD_WARNING: "ADD_WARNING",
  DELETE_WARNING: "DELETE_WARNING",
  SET_FETCHED: "SET_FETCHED",
}

export const generalWorker = {
  filter: "filter",
  hideAllData: "hideAllData",
};

export const thresholdForExcludedData = 10000;

export const excludedLabelsFromComputingArray = [ "day", "month", "year", "day month", "id" ];
