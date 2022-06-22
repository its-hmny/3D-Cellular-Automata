import { createTheme, NextUIProvider } from '@nextui-org/react';
import type { AppProps } from 'next/app';
import { SimulationProvider } from '../context/Simulation';
import '../styles/style.scss';

const MyApp = ({ Component, pageProps }: AppProps) => {
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
