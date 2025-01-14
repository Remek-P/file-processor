import "@/styles/globals.scss";
import {
  FileDataProvider,
  IndexedDB_ClickedProvider,
  IndexedDB_SizeProvider,
  IsContainingSubheadersProvider,
  IsLoadingProvider, ToggleIDViewProvider,
  WarningsProvider,
} from "@/context/global-context";

export default function App({Component, pageProps}) {
  return (
      <FileDataProvider>
        <WarningsProvider>
          <IsLoadingProvider>
            <IsContainingSubheadersProvider>
              <IndexedDB_SizeProvider>
                <IndexedDB_ClickedProvider>
                  <ToggleIDViewProvider>
                    <Component {...pageProps} />
                  </ToggleIDViewProvider>
                </IndexedDB_ClickedProvider>
              </IndexedDB_SizeProvider>
            </IsContainingSubheadersProvider>
          </IsLoadingProvider>
        </WarningsProvider>
      </FileDataProvider>
  );
}
