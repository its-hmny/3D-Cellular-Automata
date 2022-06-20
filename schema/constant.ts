import { Settings } from './types';

/**
 * Default setting used on first load of the webpage
 * @constant @type {Settings}
 */
export const DefaultSettings: Settings = {
  mode: 'von-neumann',
  dimension: 10,
  spawn_threshold: 14,
  survive_threshold: 8,
  max_life_expectancy: 13,
};
