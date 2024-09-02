import { createContext, useReducer, useState } from "react";
import {CASE_NAME, Reducer } from "./reducer";



const excelFileInitialState = {
  excelFileName: "test",
  excelFile: null,
  isLoading: false,
  isFetched: null,
  warnings: [],
  savedFiles: [],
};

export const ExcelFileDataGlobalContext = createContext(excelFileInitialState);

export const ExcelFileDataProvider = ({ children }) => {

  const [state, dispatch] = useReducer(Reducer, excelFileInitialState);

  const setLoading = (loading) => {
    dispatch({
      type: CASE_NAME.SET_LOADING,
      payload: loading,
    })
  }

  const setExcelFile = (excelFile) => {
    dispatch({
      type: CASE_NAME.SET_EXCEL_FILE,
      payload: excelFile,
    })
  }

  const setExcelFileName = (excelFileName) => {
    dispatch({
      type: CASE_NAME.SET_EXCEL_FILE_NAME,
      payload: excelFileName,
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
      <ExcelFileDataGlobalContext.Provider
          value={{
            excelFileInitialState: state.excelFileInitialState,
            setLoading,
            setExcelFile,
            setExcelFileName,
            addWarnings,
            isDataFetched,
            saveToLocalStorage,
            loadFromLocalStorage,
          }}>
        {children}
      </ExcelFileDataGlobalContext.Provider>
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

