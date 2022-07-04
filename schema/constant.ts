import { Settings } from './types';

/**
 * Default setting used on first load of the webpage
 * @constant @type {Settings}
 */
export const DefaultSettings: Settings = {
  mode: 'conway',
  dimension: 15,
  spawnThreshold: 4,
  surviveThreshold: 2,
  maxLifeExpectancy: 15,
};

/**
 * Constant/upperbound to the length of one dimension in the automaton/matrix.
 * The total number of cells in the automaton will be MaxDimensionLength ** 3.
 * @constant @type {number}
 */
export const MaxDimensionLength = 20;

/**
 * The max number of allowable neighbors for Conway's simulation mode.
 * This is mainly used to avoid inconsistent/impossible value in the
 * form mutation.
 * @constant @type {number}
 */
export const MaxConwayNeighbors = 6;

/**
 * The max number of allowable neighbors for Von Neumann's simulation mode.
 * This is mainly used to avoid inconsistent/impossible value in the form mutation.
 * @constant @type {number}
 */
export const MaxVonNeumannNeighbors = 26;
