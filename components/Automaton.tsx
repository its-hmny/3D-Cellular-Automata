import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { ReactNode, useMemo } from 'react';

import { useSimulation } from '../context/Simulation';
import { Coords } from '../schema/types';
import Cell from './Cell';

const Automaton = () => {
  // Retrieves the needed data from the SimulationContext
  const { settings, ageMatrix } = useSimulation();

  // TODO this doesn't work, try a version with useFrame and canvasRef
  // Memoized version of the camera position bases on the number of cells in the matrix
  const cameraPos = useMemo(() => [2, 1, settings.dimension + 5], [settings.dimension]);

  // Memoized version of the automaton's cells, each cell will update independently
  const toRender = useMemo(() => {
    const cells: Array<ReactNode> = []; // Vector with aggregate list of cell to be rendered
    // Computes the offset to apply in order to obtains cartesian coords from the center
    const offset = Math.round(settings.dimension / 2);

    // Allocates all the needed automaton Cells
    for (let x = 0; x < settings.dimension; x++)
      for (let y = 0; y < settings.dimension; y++)
        for (let z = 0; z < settings.dimension; z++) {
          // Initializes the cartesian plan coords
          const coords: Coords = [x - offset, y - offset, z - offset];
          // Creates linearized index to access the ageMatrix that act both as key
          const id = x + settings.dimension * y + settings.dimension ** 2 * z;
          // Adds the cell to the render list
          cells.push(<Cell key={id} {...{ ageMatrix, coords, id }} />);
        }

    return cells;
  }, [ageMatrix, settings.dimension]);

  return (
    <Canvas
      camera={{ fov: 75, near: 0.1, far: 1000, position: cameraPos }}
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