import { createContext, useReducer, useState } from "react";
// import {CASE_NAME, Reducer } from "./reducer";

const CASE_NAME = {
  SET_LOADING: "SET_LOADING",
  SET_FILE: "SET_FILE",
  SET_FILE_NAME: "SET_FILE_NAME",
  ADD_WARNING: "ADD_WARNING",
  SET_FETCHED: "SET_FETCHED",
  SAVE_FILE: "SAVE_FILE",
  LOAD_SAVED_FILES: "LOAD_SAVED_FILES",
}

const excelFileInitialState = {
  file: null,
  fileName: null,
  isFetched: null,
  isLoading: false,
  savedFiles: [],
  warnings: [],
};

function Reducer(state, action) {
  switch (action.type) {
    case CASE_NAME.SET_LOADING:
      return { ...state, isLoading: action.payload };
    case CASE_NAME.SET_FILE:
      return { ...state, excelFile: action.payload };
    case CASE_NAME.SET_FILE_NAME:
      return { ...state, excelFileName: action.payload };
    case CASE_NAME.ADD_WARNING:
      return { ...state, warnings: [...state.warnings, action.payload] };
    case CASE_NAME.SET_FETCHED:
      return { ...state, isFetched: action.payload };
    case CASE_NAME.SAVE_FILE:
      const updatedFiles = [...state.savedFiles, action.payload];
      localStorage.setItem('savedFiles', JSON.stringify(updatedFiles));
      return { ...state, savedFiles: updatedFiles };
    case CASE_NAME.LOAD_SAVED_FILES:
      return { ...state, savedFiles: action.payload };
    default:
      return state;
  }
}

export const FileDataGlobalContext = createContext(excelFileInitialState);

export const FileDataProvider = ({ children }) => {

  const [state, dispatch] = useReducer(Reducer, excelFileInitialState);

  const setLoading = (loading) => {
    dispatch({
      type: CASE_NAME.SET_LOADING,
      payload: loading,
    })
  }

  const setFile = (file) => {
    dispatch({
      type: CASE_NAME.SET_FILE,
      payload: file,
    })
  }

  const setFileName = (fileName) => {
    dispatch({
      type: CASE_NAME.SET_FILE_NAME,
      payload: fileName,
    })
  }
  const addWarnings = (warnings) => {
    dispatch({
      type: CASE_NAME.ADD_WARNING,
      payload: warnings,
    })
  }

  const isDataFetched = (isFetched) => {
    dispatch({
      type: CASE_NAME.SET_FETCHED,
      payload: isFetched,
    })
  }
  const saveToLocalStorage = (savedFiles) => {
    dispatch({
      type: CASE_NAME.SAVE_FILE,
      payload: savedFiles,
    })
  }
  const loadFromLocalStorage = (savedFiles) => {
    dispatch({
      type: CASE_NAME.LOAD_SAVED_FILES,
      payload: savedFiles,
    })
  }

  return (
      <FileDataGlobalContext.Provider
          value={{
            addWarnings,
            isDataFetched,
            loadFromLocalStorage,
            saveToLocalStorage,
            setFile,
            setFileName,
            setLoading,
            // state,
            file: state.file,
            fileName: state.fileName,
            isFetched: state.isFetched,
            isLoading: state.isLoading,
            savedFiles: state.savedFiles,
            warnings: state.warnings,
          }}>
        {children}
      </FileDataGlobalContext.Provider>
  )
}



export const DecimalGlobalContext = createContext(null);

export const DecimalDataProvider = ({ children }) => (
    <DecimalGlobalContext.Provider value={useState(undefined)}>
      {children}
    </DecimalGlobalContext.Provider>
)

export const PercentGlobalContext = createContext(null);

export const PercentDataProvider = ({ children }) => (
    <PercentGlobalContext.Provider value={useState(undefined)}>
      {children}
    </PercentGlobalContext.Provider>
)

export const ExcludedDataGlobalContext = createContext([]);

export const ExcludedDataProvider = ({ children }) => (
    <ExcludedDataGlobalContext.Provider value={useState([])}>
      {children}
    </ExcludedDataGlobalContext.Provider>
)


export const ToggleIDViewGlobalContext = createContext(null);
export const ToggleIDViewProvider = ({ children }) => (
    <ToggleIDViewGlobalContext.Provider value={useState(true)}>
      {children}
    </ToggleIDViewGlobalContext.Provider>
)


export const SearchSuggestionsOrderGlobalContext = createContext(null);

export const SearchSuggestionsOrderGlobalProvider = ({ children }) => (
    <SearchSuggestionsOrderGlobalContext.Provider value={useState(undefined)}>
      {children}
    </SearchSuggestionsOrderGlobalContext.Provider>
)

