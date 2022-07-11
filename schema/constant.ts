import { CreateRandomSeed } from '../automata/seed';

/**
 * Default setting used on first load of the webpage
 * @constant
 */
export const InitSettings = {
  mode: 'conway', // Defaults to the classic Conway's rules
  dimension: 15, // Starts with a total of 15 ** 3 cells
  lim_spawn: 4, // Requires 4 out of 6 neighbors to spawn a new cell
  lim_survive: 2, // Requires 2 out of 6 neighbors for a cell to survive
  max_states: 15, // The max age (also max life expectancy of a cell)
} as const;

/**
 * Default setting used on first load of the webpage
 * @constant
 */
export const InitSeed = CreateRandomSeed(InitSettings.dimension, InitSettings.max_states);

/**
 * Shared constant object with the max value usable by the user for things
 * such as 3D matrix dimension or number of allowed neighbors per simulation mode.
 * @constant
 */
export const MaxValues = {
  Dimension: 20,
  Neighbors: { ['conway']: 6, ['von-neumann']: 26 },
};
