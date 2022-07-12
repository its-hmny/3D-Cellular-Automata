import * as yup from 'yup';
import { CreateRandomSeed } from '../automata/seed';
import { Mode, Settings } from './types';

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
const Max = {
  Conway: 6, // Max number of possible alive neighbor in "conway" mode
  VonNeumann: 26, // Max number of possible alive neighbor in "von-neumann" mode
  MatrixSize: 20, // Max allowed number of cells per matrix dimension (n. cells: MatrixSize ** 3)
};

/**
 * The webapp metadata for SEO optimization and Social Link Preview
 * @constant
 */
export const Metadata = {
  TwitterHandle: '@its-hmny',
  Title: '3D Cellular Automata',
  Author: 'Enea Guidi (its-hmny)',
  SiteUrl: 'http://its-hmny.github.io/3D-Cellular-Automata/',
  Image: 'http://its-hmny.github.io/3D-Cellular-Automata/logo.png',
  Description: 'A Three.js webapp to simulate cellular automata in 3D',
  Keywords: ['cellular automata', '3D', 'conway', 'game of life', 'three.js', 'react'],
};

/**
 * Yup validation schema for simulation Settings type.
 * Enforces type safety at runtime as well as global thresholds/limits.
 * @constant
 */
export const SettingsSchema = yup.object({
  mode: yup
    .string()
    .required('The field is required')
    .oneOf(['conway', 'von-neumann'], 'Invalid simulation mode'),

  dimension: yup
    .number()
    .required('Field required')
    .max(Max.MatrixSize, `Max value is ${Max.MatrixSize} cells per dimension`),

  lim_spawn: yup
    .number()
    .required('Field required')
    .when('mode', {
      is: (mode: Mode) => mode === 'conway',
      then: yup.number().max(Max.Conway, 'Too big for "Conway" mode'),
      otherwise: yup.number().max(Max.VonNeumann, 'Too big for "Von Neumann" mode'),
    }),

  lim_survive: yup
    .number()
    .required('Field required')
    .when('mode', {
      is: (mode: Mode) => mode === 'conway',
      then: yup.number().max(Max.Conway, 'Too big for "Conway" mode'),
      otherwise: yup.number().max(Max.VonNeumann, 'Too big for "Von Neumann" mode'),
    }),

  max_states: yup.number().required('Field required'),
});
