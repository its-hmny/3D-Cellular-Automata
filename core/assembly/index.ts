type Position = [number, number, number];
class Settings {
  // The first considers only the six adjacent neighbor
  mode: string; // 'conway' | 'von-neumann';
  // The desired dimension of each side in the 3D space
  dimension: number;
  // The number of required neighbor in order to spawn a new cell
  spawn_threshold: number;
  // The number of required neighbor in order for a cell to survive
  survive_threshold: number;
  // The max life expectancy of every cell of the Automata
  max_life_expectancy: number;
}
export class Simulator {
  // Private local copy of the simulator settings
  private settings: Settings;
  // The index of the "active" matrix, the one that has to be rendered
  private render_matrix_idx: boolean;
  // Mechanism similar to React's Virtual DOM (VDOM)
  private matrix_A: Uint8Array;
  private matrix_B: Uint8Array;

  constructor(init: Settings) {
    // Copies the setting provided
    this.settings = init;

    // Allocates two new matrixes with the desired dimensions
    this.matrix_A = new Uint8Array(init.dimension ** 3);
    this.matrix_B = new Uint8Array(init.dimension ** 3);
    // Sets the index to access the render matrix
    this.render_matrix_idx = false;

    // Populates the matrix_A with a random seed for later
    this.CreateRandomSeed(this.matrix_A);
  }

  private CreateRandomSeed(buffer: Uint8Array): void {
    for (let offset = 0; offset < buffer.length; offset++) {
      const random = Math.random() * (this.settings.max_life_expectancy + 1);
      buffer[offset] = Math.floor(random);
    }
  }

  private CountNeighbors(pos: Position, prev: Uint8Array): number {
    let neighborCount = 0;
    const [x, y, z] = pos;
    const { dimension: dim_length, mode } = this.settings;

    function IsInBoundaries(delta: number, start: number): boolean {
      return delta <= start + 1 && delta >= 0 && delta <= dim_length;
    }

    function IsConwayNeighbor(cell: Position, neighbor: Position): boolean {
      return false;
    }

    function IsVNeumannNeighbor(cell: Position, neighbor: Position): boolean {
      for (let coordIdx = 0; coordIdx < 3; coordIdx++) {
        if (cell[coordIdx] != neighbor[coordIdx]) return true;
      }

      return false;
    }

    for (let deltaX = x - 1; IsInBoundaries(deltaX, x); deltaX++) {
      for (let deltaY = y - 1; IsInBoundaries(deltaY, y); deltaY++) {
        for (let deltaZ = z - 1; IsInBoundaries(deltaZ, z); deltaZ++) {
          // Linearizes the index to access the array
          const bufferIdx =
            deltaX + dim_length * deltaY + dim_length * dim_length * deltaZ;
          // Retrieves the current neighbor state
          const neighborState = prev[bufferIdx];

          if (mode === 'conway' && IsConwayNeighbor(pos, [deltaX, deltaY, deltaZ]))
            neighborState !== 0 && neighborCount++;

          if (mode === 'von-neumann' && IsVNeumannNeighbor(pos, [deltaX, deltaY, deltaZ]))
            neighborState !== 0 && neighborCount++;
        }
      }
    }

    return neighborCount;
  }

  private DetermineCellState(cell_state: number, n_neighbors: number): number {
    // If the cell is dead but the spawn threshold has been reached then the cell is born
    if (cell_state === 0 && n_neighbors >= this.settings.spawn_threshold)
      return this.settings.max_life_expectancy;

    // If the cell is alive and the survive threshold has been reached then the cell is aged
    if (cell_state !== 0 && n_neighbors >= this.settings.survive_threshold)
      return --cell_state;

    return 0; // Else the cell stays dead
  }

  private DeriveFromGeneration(oldGen: Uint8Array, newGen: Uint8Array): void {
    // Local copy of the max dimension reachable by an position coordinate
    const dim_length = this.settings.dimension;

    // Iterates over the full three dimensional matrix
    for (let x = 0; x < dim_length; x++) {
      for (let y = 0; y < dim_length; y++) {
        for (let z = 0; z < dim_length; z++) {
          // Count the cell alive neighbors
          const nNeighbors = this.CountNeighbors([x, y, z], oldGen);
          // Linearizes the index to access the array
          const bufferIdx = x + dim_length * y + dim_length * dim_length * z;
          // Updates the cell age in the new generation
          newGen[bufferIdx] = this.DetermineCellState(oldGen[bufferIdx], nNeighbors);
        }
      }
    }
  }

  public CurrentGeneration(): Uint8Array {
    // Based on the render_matrix_idx determines which one is the current matrix
    return this.render_matrix_idx === false ? this.matrix_A : this.matrix_B;
  }

  public NewGeneration(): void {
    // Based on the render_matrix_idx determines which one is the old and new matrix
    const oldGen = this.render_matrix_idx === false ? this.matrix_A : this.matrix_B;
    const newGen = this.render_matrix_idx === false ? this.matrix_B : this.matrix_A;

    // Overwrites the new one with the next generation (derived from the old one)
    this.DeriveFromGeneration(oldGen, newGen);
    // Flips the render_matrix_idx to the opposite value
    this.render_matrix_idx = !this.render_matrix_idx;
  }
}
