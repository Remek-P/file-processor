import {
  DecimalDataProvider,
  ExcludedDataProvider,
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
                  { children }
                </NumberOfOutputsProvider>
              </SearchSuggestionsOrderGlobalProvider>
            </SearchReducePerformanceProvider>
          </ShowAllMetricsProvider>
        </ExcludedDataProvider>
      </DecimalDataProvider>
  );
}

export default ProviderWrapper;