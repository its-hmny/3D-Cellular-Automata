import type { AppProps } from 'next/app';
import { SimulationProvider } from '../context/Simulation';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <SimulationProvider>
      <Component {...pageProps} />
    </SimulationProvider>
  );
};

export default MyApp;
