import "@/styles/globals.scss";
import AppProviderWrapper from "@/components/provider-wrapper/app-provider-wrapper";

export default function App({ Component, pageProps }) {
  return (
      <AppProviderWrapper>
        <Component { ...pageProps } />
      </AppProviderWrapper>

  );
}
