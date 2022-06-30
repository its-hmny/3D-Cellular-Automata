import { DefaultSettings } from '../schema/constant';
import { Coords, Settings } from '../schema/types';

let matrixIdx = false;
let settings = DefaultSettings;
let seed = new Uint8Array(settings.dimension ** 3);
let matrixA = new Uint8Array(settings.dimension ** 3);
let matrixB = new Uint8Array(settings.dimension ** 3);

const isInBoundaries = (delta: number, start: number) =>
  delta <= start + 1 && delta >= 0 && delta < settings.dimension;

const linearizeCoords = (coords: Coords) => {
  const [x, y, z] = coords;
  return x + settings.dimension * y + settings.dimension * settings.dimension * z;
};

const IsNeighbor = {
  ['conway']: (cell: Coords, neighbor: Coords) => {
    // Destructures the single components of the cells coordinates
    const [xa, ya, za] = cell;
    const [xb, yb, zb] = neighbor;
    // If the 'normalized' distance between the two is exactly one they're Conway neighbors
    return Math.abs(xa - xb) + Math.abs(ya - yb) + Math.abs(za - zb) === 1;
  },

  ['von-neumann']: (cell: Coords, neighbor: Coords) => {
    // Destructures the single components of the cells coordinates
    const [xa, ya, za] = cell;
    const [xb, yb, zb] = neighbor;
    const delta = Math.abs(xa - xb) + Math.abs(ya - yb) + Math.abs(za - zb);
    // Also this would be possible => return xa !== xb && ya !== yb && za !== zb;
    return delta >= 1 && delta <= 2;
  },
};

const getRandomSeed = () => {
  // Allocates the seed (initial generation) buffer
  seed = new Uint8Array(settings.dimension ** 3);

  for (let i = 0; i < seed.length; i++) {
    // In order to improve randomness each iteration has a challenge mechanism.
    // If the second random number is greater than the first the one is used to
    // determine a live cell age, else a dead cell (state: 0) is used.
    const isZerotreshold = Math.random();
    const randomNumber = Math.random();

    if (randomNumber <= isZerotreshold) seed[i] = 0;
    else seed[i] = Math.floor(randomNumber * (settings.maxLifeExpectancy + 1));
  }

  return seed.slice(0, seed.length); // Makes a copy of the seed
};

const countAliveNeighbors = (coords: Coords) => {
  let neighborCount = 0; // Counter/accumulator for the alive neighbors
  const [x, y, z] = coords; // Destructures the cell coordinates
  // Based on the state.matrixIdx determines which one is the old generation
  const oldGen = matrixIdx === false ? matrixA : matrixB;

  // For each polar coordinate p we only evaluate p-1, p and p+1
  for (let deltaX = x - 1; isInBoundaries(deltaX, x); deltaX++) {
    for (let deltaY = y - 1; isInBoundaries(deltaY, y); deltaY++) {
      for (let deltaZ = z - 1; isInBoundaries(deltaZ, z); deltaZ++) {
        // Creates the coords object for the current neighbor/candidate
        const nCoords: Coords = [deltaX, deltaY, deltaZ];
        // And fetches its current life state from the 'old' generation
        const neighborState = oldGen[linearizeCoords(nCoords)];
        // If the cell is dead there's no point in keep going on
        if (neighborState === 0) continue;
        // If the cell is alive and the neighbot is valid for the current mode,
        // then the counter is incremented accordingly
        else if (IsNeighbor[settings.mode](coords, nCoords)) neighborCount++;
      }
    }
  }

  return neighborCount;
};

const getNewCellState = (prevState: number, nAliveNeighbors: number) => {
  // If the cell is dead but the spawn threshold has been reached then the cell is born
  if (prevState === 0 && nAliveNeighbors >= settings.spawnThreshold)
    return settings.maxLifeExpectancy;

  // If the cell is alive and the survive threshold has been reached then the cell is aged
  if (prevState !== 0 && nAliveNeighbors >= settings.surviveThreshold) return --prevState;

  return 0; // Else the cell stays dead
};

export const init = (sttngs: Settings) => {
  // Makes a local copy of the settings object (used during simulation)
  settings = sttngs;

  // Allocates two new matrixes with the desired dimensions
  matrixA = getRandomSeed();
  matrixB = new Uint8Array(settings.dimension ** 3);

  return matrixA; // At last returns the initial generation to the caller
};

export const nextGeneration = () => {
  // Based on the state.matrixIdx determines which one is the old and new generation
  const oldGen = matrixIdx === false ? matrixA : matrixB;
  const newGen = matrixIdx === false ? matrixB : matrixA;

  // If every cell in the automaton is dead simply return empty generation
  if (oldGen.every(cellState => cellState === 0)) return oldGen;

  // Iterates over the full three dimensional matrix
  for (let x = 0; x < settings.dimension; x++) {
    for (let y = 0; y < settings.dimension; y++) {
      for (let z = 0; z < settings.dimension; z++) {
        // Count the alive neighboring cells for the given one
        const nAliveNeighbors = countAliveNeighbors([x, y, z]);
        // From the current cell coordinates determines its index in the buffer
        const index = linearizeCoords([x, y, z]);
        // Updates the cell age in the new generation
        newGen[index] = getNewCellState(oldGen[index], nAliveNeighbors);
      }
    }
  }

  matrixIdx = !matrixIdx; // Flips the state.matrixIdx to the opposite value
  return newGen; // At last returns the initial generation to the caller
};
