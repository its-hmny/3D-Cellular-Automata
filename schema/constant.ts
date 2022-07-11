import { CreateRandomSeed } from '../automata/seed';

/**
 * Default setting used on first load of the webpage
 * @constant @type {Settings}
 */
export const InitSettings: Settings = {
  mode: 'conway',
  dimension: 15,
  spawnThreshold: 4,
  surviveThreshold: 2,
  maxLifeExpectancy: 15,
};

/**
 * Default setting used on first load of the webpage
 * @constant @type {Uint8Array}
 */
export const InitSeed = CreateRandomSeed(
  InitSettings.dimension,
  InitSettings.maxLifeExpectancy
);

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
