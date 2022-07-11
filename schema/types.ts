import { Dispatch, MutableRefObject, SetStateAction } from 'react';

import { Simulator } from '../automata/simulator';

/**
 * Three dimension coordinates/cell position
 * @type @alias Coords
 */
export type Coords = [number, number, number];

/**
 * The available simulation modes
 * @type @alias Mode
 */
export type Mode = 'conway' | 'von-neumann';

/**
 * Data, rules and configuration params for the Cellular
 * Automata simulation algorithm
 * @type @alias Settings
 */
export type Settings = {
  // The first considers only the six adjacent neighbor
  mode: Mode;
  // The desired dimension of each side in the 3D space
  dimension: number;
  // The number of required alive neighbor in order to spawn a new cell
  lim_spawn: number;
  // The number of required alive neighbor in order for a cell to survive
  lim_survive: number;
  // The max life expectancy of every cell of the Automata
  max_states: number;
};

/**
 * The param and function provided by the context and accessible
 * by the all the consumer that will subscribe to it.
 * @type @alias SimulationCtx
 */
export type SimulationCtx = {
  // The simulator's setting (with rules and thresholds)
  settings: Settings;
  // A shared reference to the simulator class
  simulator: MutableRefObject<Simulator>;
  // Setter function to mutate the initial seed of a simulation
  setSeed: Dispatch<SetStateAction<Uint8Array>>;
  // Setter function to mutate the simulation settings
  setSettings: Dispatch<SetStateAction<Settings>>;
};
