import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { ReactNode, useMemo } from 'react';

import { Coords2Index } from '../automata/helpers';
import { useSimulation } from '../context/Simulation';
import { Coords } from '../schema/types';
import Cell from './Cell';

const Automaton = () => {
  // Retrieves the needed data from the SimulationContext
  const { settings, simulator } = useSimulation();

  // Memoized version of the automaton's cells, each cell will update independently
  const toRender = useMemo(() => {
    // Vector with aggregate list of cell to be rendered
    const cells: Array<ReactNode> = [];
    // Computes the offset to apply to each coordinates set in order to obtains cartesian
    // coords from the center. This is needed in order to position the center of the matrix
    // at the center of the canvas and the use simply <OrbitControls /> to handle movement.
    const offset = Math.round(settings.dimension / 2);

    // Allocates all the needed automaton Cells
    for (let x = 0; x < settings.dimension; x++)
      for (let y = 0; y < settings.dimension; y++)
        for (let z = 0; z < settings.dimension; z++) {
          // Initializes the cartesian plan coords
          const coords: Coords = [x - offset, y - offset, z - offset];
          // Creates linearized index to access the ageMatrix that act both as key
          const id = Coords2Index(coords, settings.dimension);
          // Adds the cell to the render list
          cells.push(<Cell key={id} {...{ simulator, coords, id }} />);
        }

    return cells;
  }, [simulator, settings.dimension]);

  return (
    <Canvas
      camera={{ fov: 75, near: 0.1, far: 1000, position: [2, 1, settings.dimension + 5] }}
      style={{ height: '100vh' }}
    >
      {/* General lighting */}
      <ambientLight />
      {/* For shadowing purposes */}
      <pointLight position={[10, 10, 10]} />
      {/* Simply allows to "navigate" the canvas */}
      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />

      {/* The cells that compose the automaton */}
      {toRender}
    </Canvas>
  );
};

export default Automaton;
