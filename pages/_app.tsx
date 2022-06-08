import { NextUIProvider } from '@nextui-org/react';
import type { AppProps } from 'next/app';
import { SimulationProvider } from '../context/Simulation';
import '../styles/style.scss';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <NextUIProvider>
      <SimulationProvider>
        <Component {...pageProps} />
      </SimulationProvider>
    </NextUIProvider>
  );
};

export default MyApp;
