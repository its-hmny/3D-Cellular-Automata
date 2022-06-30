import { createTheme, NextUIProvider } from '@nextui-org/react';
import type { AppProps } from 'next/app';

import { SimulationProvider } from '../context/Simulation';

const MyApp = ({ Component, pageProps }: AppProps) => {
  // Custom NextUI app theme (dark + orange)
  const theme = createTheme({ type: 'dark', theme: { colors: { primary: 'orange' } } });

  return (
    <NextUIProvider theme={theme}>
      <SimulationProvider>
        <Component {...pageProps} />
      </SimulationProvider>
    </NextUIProvider>
  );
};

export default MyApp;
