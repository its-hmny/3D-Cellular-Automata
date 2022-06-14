import {
  createContext,
  MutableRefObject,
  ReactNode,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';

export type Settings = {
  mode: 'conway' | 'von-neumann';
  matrix_dim: number;
  life_states: number;
  spawn_threshold: number;
  survive_threshold: number;
};

type SimulationCtx = {
  settings: Settings;
  matrix: MutableRefObject<Buffer>;

  mutateSettings: (newSettings: Partial<Settings>) => void;
};

const SimulationContext = createContext<SimulationCtx | null>(null);

export const useSimulation = () => {
  // Retrieves the data for the Web3 context in the hierarchy
  const value = useContext(SimulationContext);

  // If the context hasn't been initialized returns an error
  if (value == null)
    throw new Error('useSimulation must be used inside an SimulationContext');

  return value;
};

export const SimulationProvider = ({ children }: { children: ReactNode }) => {
  // Allocates a shared mutable buffer not filled with zeros but possibly random seed
  const matrix = useRef(Buffer.allocUnsafe(10 ** 3));

  // Data state to save chain id and wallet address, this can be changed also from Metamask
  const [settings, setSettings] = useState<Settings>({
    mode: 'conway',
    matrix_dim: 3,
    life_states: 5,
    spawn_threshold: 20,
    survive_threshold: 10,
  });

  console.log('BP__ useSimulation', settings, matrix); // ! Debug only, remove later...

  // Setter function to mutate/update the simulation settings.
  const mutateSettings = useCallback((newSettings: Partial<Settings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
    // TODO wipe out the matrix buffer
    // TODO restart the simulation from the initial seed
  }, []);

  return (
    <SimulationContext.Provider value={{ matrix, settings, mutateSettings }}>
      {children}
    </SimulationContext.Provider>
  );
};
