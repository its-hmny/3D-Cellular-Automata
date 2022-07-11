import { Coords, Settings } from '../schema/types';
import { Coords2Index, GetNeighbors, NewCellState } from './helpers';

export class Simulator {
  // The first item in the tuple is always the current generation while the other is the older
  // or the newer/wip one (depends on the moment).
  // The mechanism used is similar to how the Virtual DOM (VDOM) in React works, there is a
  // current generation (used by the components to render on the client) and a virtual one which
  // undergoes the changes, updates and mutations. When the updates have been completed then the
  // generations are switched and the role inverted seamlessly.
  private generations: [Uint8Array, Uint8Array];

  // This private function are the "closured" version the functions provided/exported
  // by helper.ts, they're bounded during construction with the settings object
  private Coords2Index: (coords: Coords) => number;
  private GetNeighbors: (coords: Coords) => Coords[];
  private NewCellState: (cellAge: number, nAlive: number) => number;

  /**
   * Allocates the matrix tuples based on the seed and settings dimension.
   * Assigns the "closured" function with the updated closured settings object.
   * @constructor
   * @param settings - The simulation settings/rules
   * @param seed - The initial generation
   */
  public constructor(settings: Settings, seed: Uint8Array) {
    // Makes a copy of the seed as initial generation and creates an empty buffer/array
    this.generations = [seed.slice(), new Uint8Array(settings.dimension ** 3)];

    // Closured functions allows for cleaner code and avoids to specify always the same params
    this.Coords2Index = (coords: Coords) => Coords2Index(coords, settings.dimension);
    this.GetNeighbors = (coords: Coords) => GetNeighbors(coords, settings);
    this.NewCellState = (cellAge: number, nAlive: number) =>
      NewCellState(cellAge, nAlive, settings);
  }

  /**
   * Returns the current (active) generation (this is a simple setter).
   * @public @method
   */
  public CurrentGeneration() {
    const [current] = this.generations;
    return current;
  }

  /**
   * Derive the new generation, making changes to the "old" matrix making it the "new" one.
   * @public @method
   */
  public NextGeneration() {
    // Destructure the current generation and the new one buffers/arrays
    const [older, newer] = this.generations;
    // Determines the length of one dimension from the buffer size
    const dim_length = Math.cbrt(older.length);

    // If every cell in the current generation is already dead there's no point in keep going
    if (older.every(cState => cState === 0)) return older;

    for (let x = 0; x < dim_length; x++) {
      for (let y = 0; y < dim_length; y++) {
        for (let z = 0; z < dim_length; z++) {
          // Get a list of the neighbors coordinates for the current cell
          const neighbors = this.GetNeighbors([x, y, z]);
          // Counts/filters the alive neighbors
          const { length: nAlive } = neighbors.filter(c => older[this.Coords2Index(c)]);
          // Determines the current cell index
          const cellIndex = this.Coords2Index([x, y, z]);
          // Derives the updated state of the current cell
          newer[cellIndex] = this.NewCellState(older[cellIndex], nAlive);
        }
      }
    }

    // Switch the older generation with the new one
    this.generations.reverse();
  }
}
