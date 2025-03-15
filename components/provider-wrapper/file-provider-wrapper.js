import {
  DataToHideProvider,
  DecimalDataProvider,
  ExcludedDataProvider,
  HideTileProvider,
  SearchReducePerformanceProvider,
  SearchSuggestionsOrderGlobalProvider,
  ShowAllMetricsProvider
} from "@/context/global-context";

function FileProviderWrapper({ children }) {
  return (
      <DecimalDataProvider>
        <ExcludedDataProvider>
          <ShowAllMetricsProvider>
            <SearchReducePerformanceProvider>
              <SearchSuggestionsOrderGlobalProvider>
                <HideTileProvider>
                  <DataToHideProvider>
                    { children }
                  </DataToHideProvider>
                </HideTileProvider>
              </SearchSuggestionsOrderGlobalProvider>
            </SearchReducePerformanceProvider>
          </ShowAllMetricsProvider>
        </ExcludedDataProvider>
      </DecimalDataProvider>
  );
}

export default FileProviderWrapper;