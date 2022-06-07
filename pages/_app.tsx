import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { SimulationProvider } from '../context/Simulation';

function MyApp({ Component, pageProps }: AppProps) {
  // Overrides/merges the default theme with new values
  const theme = extendTheme({}); // TODO add personal theming options

  return (
    <ChakraProvider theme={theme}>
      <SimulationProvider>
        <Component {...pageProps} />
      </SimulationProvider>
    </ChakraProvider>
  );
}

export default MyApp;
