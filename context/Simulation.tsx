import { createContext, ReactNode, useContext, useEffect, useRef, useState } from 'react';

import { CreateRandomSeed } from '../automata/seed';
import { Simulator } from '../automata/simulator';
import { InitSeed, InitSettings } from '../schema/constant';
import { Settings, SimulationCtx } from '../schema/types';

// Creates a new Simulation Context
const SimulationContext = createContext<SimulationCtx | null>(null);

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
  // Having this reference allows to generate a new generation on-demand and/or get the current one.
  const simulator = useRef<Simulator>(new Simulator(InitSettings, InitSeed));

  // Internal state that stores the initial seed of the Simulator
  const [seed, setSeed] = useState<Uint8Array>(InitSeed);
  // Shared state that stores the Simulator's rules
  const [settings, setSettings] = useState<Settings>(InitSettings);

  // If the dimension or the max life expectancy have been changed it is necessary
  // then to recreate a new random seed with the proper dimension and cells age.
  useEffect(() => {
    setSeed(CreateRandomSeed(settings.dimension, settings.max_states));
  }, [settings.dimension, settings.max_states]);

  // Whenever the settings or the seed changes the Simulator is recreated from scratch.
  useEffect(() => {
    simulator.current = new Simulator(settings, seed);
  }, [seed, settings]);

  return (
    <SimulationContext.Provider value={{ settings, simulator, setSettings, setSeed }}>
      {children}
    </SimulationContext.Provider>
  );
};
