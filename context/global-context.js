import { createContext, useReducer, useState } from "react";
import {CASE_NAME, Reducer } from "./reducer";

const excelFileInitialState = {
  file: null,
  fileName: null,
  isFetched: null,
  isLoading: false,
  savedFiles: [],
  warnings: [],
};

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
            file: state.file,
            fileName: state.fileName,
            isFetched: state.isFetched,
            isLoading: state.isLoading,
            savedFiles: state.savedFiles,
            warnings: state.warnings,
            addWarnings,
            isDataFetched,
            loadFromLocalStorage,
            saveToLocalStorage,
            setFile,
            setFileName,
            setLoading,
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

export const LabelsGlobalContext = createContext(undefined);

export const LabelsGlobalProvider = ({ children }) => (
    <LabelsGlobalContext.Provider value={useState(undefined)}>
      {children}
    </LabelsGlobalContext.Provider>
)

export const HeadersGlobalContext = createContext(undefined);

export const HeadersOrderGlobalProvider = ({ children }) => (
    <HeadersGlobalContext.Provider value={useState(undefined)}>
      {children}
    </HeadersGlobalContext.Provider>
)

