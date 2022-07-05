import {
  createContext,
  MutableRefObject,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { Simulator } from '../automata/simualtor';
import { InitSeed, InitSettings } from '../schema/constant';
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
  // A shared reference to the simulator class
  simulator: MutableRefObject<Simulator>;
  // Setter function to mutate the initial seed of a simulation
  setSeed: (newSeed: Uint8Array) => void;
  // Setter function to mutate the simulation settings
  setSettings: (newSettings: Settings) => void;
};

/**
 * Custom hook to easily retrieve the context data/values from a consumer component.
 * If not used from inside a SimulationContext provider it will throw an Error.
 * ! NOTE: It can't be used inside three.js' canvas component since
 * ! React context will not be propagated inside <canvas> tags.
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
  // Mutable, shared and readonly reference to the simulator.
  // Having this reference allows to generate a new generation on-demand and get the current one
  const simulator = useRef<Simulator>(new Simulator(InitSettings, InitSeed));

  // Internal state that stores the initial seed of the Simulator
  const [seed, setSeed] = useState<Uint8Array>(InitSeed);
  // Shared state that stores the Simulator's rules
  const [settings, setSettings] = useState<Settings>(InitSettings);

  // Whenever the settings or the seed changes the Simulator is recreated
  useEffect(() => {
    simulator.current = new Simulator(settings, seed);
  }, [seed, settings]);

  return (
    <SimulationContext.Provider value={{ settings, simulator, setSettings, setSeed }}>
      {children}
    </SimulationContext.Provider>
  );
};
