import { createTheme, NextUIProvider } from '@nextui-org/react';
import type { AppProps } from 'next/app';

import { SimulationProvider } from '../context/Simulation';

const MyApp = ({ Component, pageProps }: AppProps) => {
  // Custom NextUI app theme (dark + orange as primary color)
  const theme = createTheme({
    type: 'dark',
    theme: { colors: { primary: 'orange', selection: '#704705' } },
  });

  return (
    <NextUIProvider theme={theme}>
      <SimulationProvider>
        <Component {...pageProps} />
      </SimulationProvider>
    </NextUIProvider>
  );
};

export default MyApp;
