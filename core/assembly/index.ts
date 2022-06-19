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

  private DeriveFromGeneration(oldGen: Uint8Array, newGen: Uint8Array): void {
    // TODO Implement the simulation algorithm
    this.CreateRandomSeed(newGen);
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
