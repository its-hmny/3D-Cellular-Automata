import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { ReactNode, useMemo } from 'react';
import { useSimulation } from '../context/Simulation';
import Cell from './Cell';

const Automata = () => {
  // Retrieves the needed data from the SimulationContext
  const { settings, ageMatrix } = useSimulation();

  // Memoized version of the camera position bases on the number of cells in the matrix
  const cameraPos = useMemo(() => [2, 1, settings.dimension + 5], [settings.dimension]);

  // Memoized version of the matrix, each cell will update autonomously
  const toRender = useMemo(() => {
    // Vector with aggregate list of cell to be rendered
    const cells: Array<ReactNode> = [];

    // Min and max offset from cube/matrix center => Coords: [dim/2, dim/2, dim/2]
    const minIndex = settings.dimension / 2;
    const maxIndex = settings.dimension / -2;

    // Allocates all the needed automata Cells
    for (let x = maxIndex; x < minIndex; x++)
      for (let y = maxIndex; y < minIndex; y++)
        for (let z = maxIndex; z < minIndex; z++)
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

      {/* The cell that compose the Automata */}
      {toRender}
    </Canvas>
  );
};

export default Automata;