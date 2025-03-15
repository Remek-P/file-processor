import {
  FileDataProvider,
  IndexedDB_ClickedProvider,
  IndexedDB_SizeProvider,
  IsContainingSubheadersProvider,
  IsLoadingProvider,
  NumberOfOutputsProvider,
  QueryProvider,
  ToggleIDViewProvider,
  WarningsProvider
} from "@/context/global-context";

function AppProviderWrapper({ children }) {
  return (
      <FileDataProvider>
        <WarningsProvider>
          <IsLoadingProvider>
            <IsContainingSubheadersProvider>
              <IndexedDB_SizeProvider>
                <IndexedDB_ClickedProvider>
                  <ToggleIDViewProvider>
                    <NumberOfOutputsProvider>
                      <QueryProvider>
                        { children }
                      </QueryProvider>
                    </NumberOfOutputsProvider>
                  </ToggleIDViewProvider>
                </IndexedDB_ClickedProvider>
              </IndexedDB_SizeProvider>
            </IsContainingSubheadersProvider>
          </IsLoadingProvider>
        </WarningsProvider>
      </FileDataProvider>
  );
}

export default AppProviderWrapper;