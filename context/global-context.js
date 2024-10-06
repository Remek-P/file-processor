import { createContext, useReducer, useState } from "react";
import {CASE_NAME, Reducer } from "./reducer";

const excelFileInitialState = {
  file: null,
  fileName: null,
  isFetched: null,
  isLoading: false,
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

  return (
      <FileDataGlobalContext.Provider
          value={{
            file: state.file,
            fileName: state.fileName,
            isFetched: state.isFetched,
            isLoading: state.isLoading,
            warnings: state.warnings,
            addWarnings,
            isDataFetched,
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
    <ToggleIDViewGlobalContext.Provider value={useState(false)}>
      {children}
    </ToggleIDViewGlobalContext.Provider>
)

export const SearchSuggestionsOrderGlobalContext = createContext(null);

export const SearchSuggestionsOrderGlobalProvider = ({ children }) => (
    <SearchSuggestionsOrderGlobalContext.Provider value={useState(undefined)}>
      {children}
    </SearchSuggestionsOrderGlobalContext.Provider>
)

