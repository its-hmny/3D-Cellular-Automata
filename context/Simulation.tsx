import {
  createContext,
  MutableRefObject,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Simulator } from '../core/assembly';
import { DefaultSettings } from '../schema/constant';
import { Settings } from '../schema/types';

// Creates a new Simulation Context
const SimulationContext = createContext<SimulationCtx | null>(null);

/**
 * The param and function provided by the context and accessible
 * by the all the consumer that will subscribe to it.
 * @type @alias SimulationCtx
 */
type SimulationCtx = {
  // The simulator's setting (with rules and thresholds)
  settings: Settings;
  // The cell's age counter (0 is dead, x > 0 is alive)
  age_matrix: MutableRefObject<Uint8Array | undefined>;
  // Setter function to mutate the settings state and reset the simulation
  mutate: (newSettings: Partial<Settings>) => void;
};

/**
 * Custom hook to easily retrieve the context data/values from a consumer
 * component. If not used inside a provider it will throw an exception.
 * NOTE: It can't be used inside three.js' canvas component since
 * the context will not be propagated inside <canvas> tags.
 * @returns {SimulationCtx}
 */
export const useSimulation = () => {
  // Retrieves the data for the Web3 context in the hierarchy
  const value = useContext(SimulationContext);
  // If the context hasn't been initialized returns an error
  if (value == null)
    throw new Error('useSimulation must be used inside an SimulationContext');
  return value;
};

export const SimulationProvider = ({ children }: { children: ReactNode }) => {
  // Mutable, shared and readonly reference to the cells age buffer (a linearized matrix)
  const age_matrix = useRef<Uint8Array>();
  // Data state to save chain id and wallet address, this can be changed also from Metamask
  const [settings, setSettings] = useState<Settings>(DefaultSettings);

  // Setter function to mutate/update/patch the simulation settings.
  const mutate = useCallback(
    (patch: Partial<Settings>) => setSettings(prev => ({ ...prev, ...patch })),
    []
  );

  // Whenever the settings changes the simulator is reset and restarted
  useEffect(() => {
    // Creates a new simulator with the current provided settings
    const simulator = new Simulator(settings);
    // Sets the current age_matrix reference to the current generation
    age_matrix.current = simulator.CurrentGeneration();
    // ! Debug only, remove later...
    console.log('BP__ useSimulation', settings, age_matrix);

    // Every one second a new generation is created and set as the current one
    const intervalId = setInterval(() => {
      simulator.NewGeneration();
      age_matrix.current = simulator.CurrentGeneration();
    }, 100);

    // Cleanup functions, removes the inteval
    return () => clearInterval(intervalId);
  }, [settings]);

  return (
    <SimulationContext.Provider value={{ age_matrix, settings, mutate: mutate }}>
      {children}
    </SimulationContext.Provider>
  );
};
