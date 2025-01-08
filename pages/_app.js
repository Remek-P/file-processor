import "@/styles/globals.scss";
import {FileDataProvider, IndexedDB_SizeProvider, IsContainingSubheadersProvider} from "@/context/global-context";

export default function App({ Component, pageProps }) {
  return (
      <FileDataProvider>
        <IsContainingSubheadersProvider>
          <IndexedDB_SizeProvider>
            <Component {...pageProps} />
          </IndexedDB_SizeProvider>
        </IsContainingSubheadersProvider>
      </FileDataProvider>
  );
}
