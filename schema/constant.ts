import { Settings } from './types';

/**
 * Default setting used on first load of the webpage
 * @constant @type {Settings}
 */
export const DefaultSettings: Settings = {
  mode: 'conway',
  dimension: 10,
  spawn_threshold: 20,
  survive_threshold: 10,
  max_life_expectancy: 5,
};
