/**
 * Three dimension coordinates/cell position
 * @type @alias Coords
 */
export type Coords = [number, number, number];

/**
 * Data, rules and configuration params for the Cellular
 * Automata simulation algorithm
 * @type @alias Settings
 */
export type Settings = {
  // The first considers only the six adjacent neighbor
  mode: 'conway' | 'von-neumann';
  // The desired dimension of each side in the 3D space
  dimension: number;
  // The number of required neighbor in order to spawn a new cell
  spawnThreshold: number;
  // The number of required neighbor in order for a cell to survive
  surviveThreshold: number;
  // The max life expectancy of every cell of the Automata
  maxLifeExpectancy: number;
};
