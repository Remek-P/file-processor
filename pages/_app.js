import "@/styles/globals.scss";
import {
  FileDataProvider,
  IndexedDB_ClickedProvider,
  IndexedDB_SizeProvider,
  IsContainingSubheadersProvider,
  IsLoadingProvider
} from "@/context/global-context";

export default function App({Component, pageProps}) {
  return (
      <FileDataProvider>
        <IsLoadingProvider>
          <IsContainingSubheadersProvider>
            <IndexedDB_SizeProvider>
              <IndexedDB_ClickedProvider>
                <Component {...pageProps} />
              </IndexedDB_ClickedProvider>
            </IndexedDB_SizeProvider>
          </IsContainingSubheadersProvider>
        </IsLoadingProvider>
      </FileDataProvider>
  );
}
