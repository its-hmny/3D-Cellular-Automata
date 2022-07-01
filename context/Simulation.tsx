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

import * as simulator from '../core';
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
  ageMatrix: MutableRefObject<Uint8Array | undefined>;
  // Setter function to mutate the settings state and reset the simulation
  mutate: (newSettings: Settings) => void;
  // Utilities to start/stop and determine the state of the current simulation
  stop: () => void;
  start: () => void;
  isActive: boolean;
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
  // Mutable, shared and readonly reference to the cells age buffer (a linearized matrix)
  const ageMatrix = useRef<Uint8Array>();

  // Shared state that stores the simulation configurations/settings
  const [settings, setSettings] = useState<Settings>(DefaultSettings);
  // Internal state to keep track of the current simulation id to start/stop the latter
  const [simulationId, setSimulationId] = useState<any>();

  // Starts the simulation of with the given settings/simulator
  const start = useCallback(() => {
    // Every 100 milliseconds a new generation is created and set as the current one.
    const intervalId = setInterval(() => {
      ageMatrix.current = simulator.nextGeneration();
    }, 100);

    // The interval's id is used more broadly as simulationId
    setSimulationId(intervalId);
  }, []);

  // Stops the current simulation, it can be resumed later eventually
  const stop = useCallback(() => {
    clearInterval(simulationId), setSimulationId(undefined);
  }, [simulationId]);

  // Whenever the settings changes the simulator is reset and restarted
  useEffect(() => {
    // Creates a new simulator with the current provided settings and
    // sets the initial age_matrix reference to the current generation
    ageMatrix.current = simulator.init(settings);
  }, [settings]);

  return (
    <SimulationContext.Provider
      value={{
        ageMatrix,
        isActive: !!simulationId,
        mutate: setSettings,
        settings,
        start,
        stop,
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
};
