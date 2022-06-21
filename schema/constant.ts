import { Settings } from './types';

/**
 * Default setting used on first load of the webpage
 * @constant @type {Settings}
 */
export const DefaultSettings: Settings = {
  mode: 'conway',
  dimension: 10,
  spawnThreshold: 4,
  surviveThreshold: 3,
  maxLifeExpectancy: 15,
};
