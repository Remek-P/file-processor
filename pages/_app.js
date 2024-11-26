import "@/styles/globals.scss";
import {FileDataProvider, IsContainingSubheadersProvider} from "@/context/global-context";

export default function App({ Component, pageProps }) {
  return (
      <FileDataProvider>
        <IsContainingSubheadersProvider>
          <Component {...pageProps} />
        </IsContainingSubheadersProvider>
      </FileDataProvider>
  );
}
