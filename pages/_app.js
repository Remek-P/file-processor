import "@/styles/globals.scss";
import { FileDataProvider } from "@/context/global-context";

export default function App({ Component, pageProps }) {
  return (
      <FileDataProvider>
        <Component {...pageProps} />
      </FileDataProvider>
  );
}
