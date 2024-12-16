import {
  DecimalDataProvider,
  ExcludedDataProvider, HideTileProvider,
  NumberOfOutputsProvider,
  SearchReducePerformanceProvider,
  SearchSuggestionsOrderGlobalProvider,
  ShowAllMetricsProvider
} from "@/context/global-context";

function ProviderWrapper({ children }) {
  return (
      <DecimalDataProvider>
        <ExcludedDataProvider>
          <ShowAllMetricsProvider>
            <SearchReducePerformanceProvider>
              <SearchSuggestionsOrderGlobalProvider>
                <NumberOfOutputsProvider>
                  <HideTileProvider>
                    { children }
                  </HideTileProvider>
                </NumberOfOutputsProvider>
              </SearchSuggestionsOrderGlobalProvider>
            </SearchReducePerformanceProvider>
          </ShowAllMetricsProvider>
        </ExcludedDataProvider>
      </DecimalDataProvider>
  );
}

export default ProviderWrapper;