import type { AppProps } from "next/app";
import { ContainerProvider } from "../view/hooks/useContainer";
import { container } from "../container";
import { GlobalStyles } from "../view/styling/globalStyles";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ContainerProvider container={container}>
      <GlobalStyles />
      <Component {...pageProps} />
    </ContainerProvider>
  );
}
