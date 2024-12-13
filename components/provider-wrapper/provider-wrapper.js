import {
  DecimalDataProvider,
  ExcludedDataProvider,
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
                { children }
              </SearchSuggestionsOrderGlobalProvider>
            </SearchReducePerformanceProvider>
          </ShowAllMetricsProvider>
        </ExcludedDataProvider>
      </DecimalDataProvider>
  );
}

export default ProviderWrapper;