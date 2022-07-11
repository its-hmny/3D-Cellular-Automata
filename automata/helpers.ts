import { Coords, Settings } from '../schema/types';

/**
 * Given the coords of a cell and the dimension length, computes the
 * index to be used in the 'linearized' matrix.
 * It can also be safely used as UID/Key f the cell.
 * @function
 * @param coords - The coordinates to convert back
 * @param dim_length - The length of each dimension
 */
export const Coords2Index = (coords: Coords, dim_length: number) => {
  const [x, y, z] = coords;
  return x + dim_length * y + dim_length ** 2 * z;
};

/**
 * Object that provides one validator for each simulation mode.
 * As of now the only mode available are 'conway' and 'von-neumann' but
 * this can eventually be expanded in future to n modes.
 * @constant
 */
const IsNeighbor = {
  ['conway']: (cell: Coords, neighbor: Coords) => {
    // Destructure the single components of the cells coordinates
    const [xa, ya, za] = cell;
    const [xb, yb, zb] = neighbor;
    // The 'norm' of the distance between the two coords
    const delta = Math.abs(xa - xb) + Math.abs(ya - yb) + Math.abs(za - zb);
    // If the 'normalized' distance between the two is exactly one they're Conway neighbors
    return delta === 1;
  },

  ['von-neumann']: (cell: Coords, neighbor: Coords) => {
    // Destructure the single components of the cells coordinates
    const [xa, ya, za] = cell;
    const [xb, yb, zb] = neighbor;
    // The 'norm' of the distance between the two coords
    const delta = Math.abs(xa - xb) + Math.abs(ya - yb) + Math.abs(za - zb);
    // Also this would be possible => return xa !== xb && ya !== yb && za !== zb;
    return delta == 1 || delta == 2;
  },
};

/**
 * Given a set of coordinates and some additional data about the execution
 * context, returns a list of coordinates for each valid neighbor.
 * This list will be have 6 items with mode="conway" and 26 with mode="con-neumann".
 * @function
 * @param coords - The coordinates of the current/center cell
 * @param settings - The setting object with rules and params
 */
export const GetNeighbors = (coords: Coords, settings: Settings) => {
  // Destructure the required params from the setting object
  const { dimension, mode } = settings;

  // Allocates the neighbor list
  const list: Coords[] = [];
  // Destructure the single components of the current cells
  const [x0, y0, z0] = coords;

  // Inline function to check that some coords are inside the "area" of the cube
  const IsInBoundaries = (delta: number, start: number) =>
    delta <= start + 1 && delta >= 0 && delta < dimension;

  // Yeld the coordinates of each neighbor based on the simulation mode
  for (let x1 = x0 - 1; IsInBoundaries(x1, x0); x1++)
    for (let y1 = y0 - 1; IsInBoundaries(y1, y0); y1++)
      for (let z1 = z0 - 1; IsInBoundaries(z1, z0); z1++)
        if (IsNeighbor[mode](coords, [x1, y1, z1])) list.push([x1, y1, z1]);

  return list; // Returns the already filtered neighbor list
};

/**
 * Based on the previous state and the execution settings (the thresholds)
 * computes and returns the new cell state.
 * @function
 * @param cellAge - The current cell state/age
 * @param nAlive - The number of alive neighbors
 * @param settings - The setting object with rules and params
 */
export const NewCellState = (cellAge: number, nAlive: number, settings: Settings) => {
  // Destructure the required params from the setting object
  const { lim_spawn, lim_survive, max_states } = settings;

  // If the cell is dead but the spawn threshold has been reached then the cell is born
  if (cellAge === 0 && nAlive >= lim_spawn) return max_states;

  // If the cell is alive and the survive threshold has been reached then the cell is aged
  if (cellAge !== 0 && nAlive >= lim_survive) return --cellAge;

  return 0; // Else the cell stays dead
};
