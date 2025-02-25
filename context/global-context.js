import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { Reducer } from "./reducer";
import { isContainingSubheaders } from "@/utils/parserUtils";
import { CASE_NAME } from "@/constants/constants";

const excelFileInitialState = {
  file: null,
  fileName: null,
  isFetched: null,
};

export const FileDataGlobalContext = createContext(excelFileInitialState);
export const FileDataProvider = ({ children }) => {

  const [ state, dispatch ] = useReducer(Reducer, excelFileInitialState);

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

  const isDataFetched = (isFetched) => {
    dispatch({
      type: CASE_NAME.SET_FETCHED,
      payload: isFetched,
    })
  }

  const toBeExported = {
    file: state.file,
    fileName: state.fileName,
    isFetched: state.isFetched,
    isDataFetched,
    setFile,
    setFileName,
  };

  return (
      <FileDataGlobalContext.Provider
          value={ toBeExported }>
        { children }
      </FileDataGlobalContext.Provider>
  )
}

const warningsInitialState = { warnings: [] }
export const WarningsContext = createContext(warningsInitialState);
export const WarningsProvider = ({ children }) => {

  const [ state, dispatch ] = useReducer(Reducer, warningsInitialState);

  const addWarnings = (warnings) => {
    dispatch({
      type: CASE_NAME.ADD_WARNING,
      payload: warnings,
    })
  }

  const deleteWarning = (warning) => {
    dispatch({
      type: CASE_NAME.DELETE_WARNING,
      payload: warning,
    })
  }

  return <WarningsContext.Provider value={{
    warnings: state.warnings,
    addWarnings,
    deleteWarning
  }}>
    { children }
  </WarningsContext.Provider>
};

export const IsLoadingContext = createContext(null);
export const IsLoadingProvider = ({ children }) => (
    <IsLoadingContext.Provider value={ useState(false) }>
      { children }
    </IsLoadingContext.Provider>
);

export const DecimalGlobalContext = createContext(null);
export const DecimalDataProvider = ({ children }) => (
    <DecimalGlobalContext.Provider value={ useState(undefined) }>
      { children }
    </DecimalGlobalContext.Provider>
);

export const PercentGlobalContext = createContext(null);
export const PercentDataProvider = ({ children }) => (
    <PercentGlobalContext.Provider value={ useState(undefined) }>
      { children }
    </PercentGlobalContext.Provider>
);

export const ExcludedDataGlobalContext = createContext([]);
export const ExcludedDataProvider = ({ children }) => (
    <ExcludedDataGlobalContext.Provider value={ useState([]) }>
      { children }
    </ExcludedDataGlobalContext.Provider>
);

export const HideTileContext = createContext(null);
export const HideTileProvider = ({ children }) => (
    <HideTileContext.Provider value={ useState(false) }>
      { children }
    </HideTileContext.Provider>
);

export const ToggleIDViewGlobalContext = createContext(null);
export const ToggleIDViewProvider = ({ children }) => (
    <ToggleIDViewGlobalContext.Provider value={ useState(false) }>
      { children }
    </ToggleIDViewGlobalContext.Provider>
);

export const ShowAllMetricsContext = createContext(null);
export const ShowAllMetricsProvider = ({ children }) => (
    <ShowAllMetricsContext.Provider value={ useState(true) }>
      { children }
    </ShowAllMetricsContext.Provider>
);

export const SearchSuggestionsOrderGlobalContext = createContext(null);
export const SearchSuggestionsOrderGlobalProvider = ({ children }) => (
    <SearchSuggestionsOrderGlobalContext.Provider value={ useState(undefined) }>
      { children }
    </SearchSuggestionsOrderGlobalContext.Provider>
);

export const IsContainingSubheadersContext = createContext(null);
export const IsContainingSubheadersProvider = ({ children }) => {
  const [ isSubheaders, setIsSubheaders ] = useState(undefined);

  const { file } = useContext(FileDataGlobalContext);

  useEffect(() => {
    if (file === null && isSubheaders !== undefined) setIsSubheaders(undefined);
    if (file !== null && isSubheaders === undefined) setIsSubheaders(isContainingSubheaders(file));
  }, [ file ]);

  const contextValue = {
    isSubheaders,
    overrideSubheadersDetection: () => setIsSubheaders(prevState => !prevState),
    setIsSubheaders,
  };

  return (
      <IsContainingSubheadersContext.Provider value={ contextValue }>
        { children }
      </IsContainingSubheadersContext.Provider>
  );
};

export const SearchReducePerformanceContext = createContext(null);
export const SearchReducePerformanceProvider = ({ children }) => (
    <SearchReducePerformanceContext.Provider value={ useState(true) }>
      { children }
    </SearchReducePerformanceContext.Provider>
);

export const NumberOfOutputsContext = createContext([ null ]);
export const NumberOfOutputsProvider = ({ children }) => (
    <NumberOfOutputsContext.Provider value={ useState([ { id: 1 } ]) }>
      { children }
    </NumberOfOutputsContext.Provider>
);

export const IndexedDB_SizeContext = createContext(null);
export const IndexedDB_SizeProvider = ({ children }) => (
    <IndexedDB_SizeContext.Provider value={ useState(undefined) }>
      { children }
    </IndexedDB_SizeContext.Provider>
);

export const IndexedDB_ClickedContext = createContext(null);
export const IndexedDB_ClickedProvider = ({ children }) => (
    <IndexedDB_ClickedContext.Provider value={ useState(0) }>
      { children }
    </IndexedDB_ClickedContext.Provider>
);

export const DataToHideContext = createContext([]);
export const DataToHideProvider = ({ children }) => (
    <DataToHideContext.Provider value={ useState([]) }>
      { children }
    </DataToHideContext.Provider>
);