import {
  DataToHideProvider,
  DecimalDataProvider,
  ExcludedDataProvider, HideTileProvider,
  NumberOfOutputsProvider,
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
                <NumberOfOutputsProvider>
                  <HideTileProvider>
                    <DataToHideProvider>
                      { children }
                    </DataToHideProvider>
                  </HideTileProvider>
                </NumberOfOutputsProvider>
              </SearchSuggestionsOrderGlobalProvider>
            </SearchReducePerformanceProvider>
          </ShowAllMetricsProvider>
        </ExcludedDataProvider>
      </DecimalDataProvider>
  );
}

export default FileProviderWrapper;