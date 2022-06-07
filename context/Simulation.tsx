import {
  createContext,
  MutableRefObject,
  ReactNode,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';

export type SimulationSettings = {
  mode: 'conway' | 'von-neumann';
  survival_threshold: [number, number];
  spawn_threshold: [number, number];
  life_states: number;
};

type SimulationCtx = {
  settings: SimulationSettings;
  matrix: MutableRefObject<Buffer>;
  mutateSettings: (newSettings: Partial<SimulationSettings>) => void;
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
  const matrix = useRef(Buffer.allocUnsafe(30 * 30 * 30));

  // Data state to save chain id and wallet address, this can be changed also from Metamask
  const [settings, setSettings] = useState<SimulationSettings>({
    mode: 'conway',
    survival_threshold: [10, 10],
    spawn_threshold: [20, 20],
    life_states: 5,
  });

  console.log('BP__ useSimulation', settings, matrix); // ! Debug only, remove later...

  // Setter function to mutate/update the simulation settings.
  const mutateSettings = useCallback((newSettings: Partial<SimulationSettings>) => {
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
