import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { ReactNode, useMemo } from 'react';

import { useSimulation } from '../context/Simulation';
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

    // TODO works correctly only with even dimension number (check/implement for odds)
    // Min and max offset from cube/matrix center => Coords: [dim/2, dim/2, dim/2]
    const maxIndex = settings.dimension / 2;
    const minIndex = settings.dimension / -2;

    // Allocates all the needed automaton Cells
    for (let x = minIndex; x < maxIndex; x++)
      for (let y = minIndex; y < maxIndex; y++)
        for (let z = minIndex; z < maxIndex; z++)
          cells.push(
            <Cell key={`${x}${y}${z}`} position={[x, y, z]} ageMatrix={ageMatrix} />
          );

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
