import { ChangeEvent } from 'react';
import { Coords, Mode, Settings } from '../schema/types';

/**
 * Given the coords of a cell and the dimension length, computes the
 * index to be used in the 'linearized' matrix.
 * It can also be safely used as UID/Key f the cell.
 * @function
 */
export const Coords2Index = (coords: Coords, dim_length: number) => {
  const [x, y, z] = coords;
  return x + dim_length * y + dim_length ** 2 * z;
};

/**
 * Creates a seed generations randomly and returns it.
 * Tries to randomize as much as it can the random number generation.
 * @function
 */
export const CreateRandomSeed = (dim_length: number, max_value: number) => {
  // Allocates the seed (also initial generation) buffer/array
  const seed = new Uint8Array(dim_length ** 3);

  for (let i = 0; i < seed.length; i++) {
    // In order to improve randomness each iteration has a challenge mechanism.
    const isZeroThreshold = Math.floor(Math.random() * max_value);
    // If the second random number is greater than the first the one is used to
    // determine a live cell age, else a dead cell (state: 0) is used.
    const randomAge = Math.floor(Math.random() * max_value);
    seed[i] = randomAge <= isZeroThreshold ? randomAge : 0;
  }

  return seed; // Returns the generated seed generation
};

/**
 * Opens a upload file dialog to the user and awaits for interaction.
 * Once the file has been chosen reads its content and converts the data back
 * to a UInt8Array (the seed format) and calls the completion callback
 * @function
 * @param {(Uint8Array) => void} onImportCompleted - Completion callback
 */
export const ImportSeed = (onImportCompleted: (newSeed: Uint8Array) => void) => {
  // Inline function to converts the file content to a UInt8Array (the seed)
  const TextToSeed = (e: ProgressEvent<FileReader>) => {
    // Text to Buffer object
    const buffer = Buffer.from(JSON.parse(e.target?.result as string));
    // Buffer to UInt8Array that is then passed to the callback
    onImportCompleted(new Uint8Array(buffer));
  };

  // Event listener to read a file uploaded by the user
  const onFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    reader.addEventListener('load', TextToSeed);
    reader.readAsText(e.target.files?.item(0) ?? new Blob());
  };

  // Creates a temporary input type file element 
  const input = document.createElement('input');
  input.type = 'file';
  input.onchange = onFileUpload as any;
  input.accept = 'application/json';

  input.click(); // Opens the dialog on the client
};

/**
 * Exports the given seed to JSON file and triggers the download
 * @function
 * @param {Uint8Array} seed - The seed to export
 */
export const ExportSeed = (seed: Uint8Array) => {
  // Converts the seed to a binary blob
  const jsonSeed = JSON.stringify(Buffer.from(seed));
  const blob = new Blob([jsonSeed], { type: 'application/json' });

  // Creates an anchor (<a>) element with the blob URL as href
  const anchor = document.createElement('a');
  anchor.href = window.URL.createObjectURL(blob);
  anchor.download = 'Seed.json';

  anchor.click(); // Triggers the download on the clients
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
 */
export const GetNeighbors = (coords: Coords, dim_length: number, mode: Mode) => {
  // Allocates the neighbor list
  const list: Coords[] = [];
  // Destructure the single components of the current cells
  const [x0, y0, z0] = coords;

  // Inline function to check that some coords are inside the "area" of the cube
  const IsInBoundaries = (delta: number, start: number) =>
    delta <= start + 1 && delta >= 0 && delta < dim_length;

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
 */
export const NewCellState = (prev: number, nAlive: number, settings: Settings) => {
  // Destructure the required params from the setting object
  const { spawnThreshold, surviveThreshold, maxLifeExpectancy } = settings;

  // If the cell is dead but the spawn threshold has been reached then the cell is born
  if (prev === 0 && nAlive >= spawnThreshold) return maxLifeExpectancy;

  // If the cell is alive and the survive threshold has been reached then the cell is aged
  if (prev !== 0 && nAlive >= surviveThreshold) return --prev;

  return 0; // Else the cell stays dead
};
