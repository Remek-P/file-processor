import "@/styles/globals.scss";
import {
  FileDataProvider,
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
              <Component {...pageProps} />
            </IndexedDB_SizeProvider>
          </IsContainingSubheadersProvider>
        </IsLoadingProvider>
      </FileDataProvider>
  );
}
