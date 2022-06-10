import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { ReactNode, useMemo } from 'react';
import Cell from './Cell';

const SimulationCanvas = () => {
  const nDimension = 15;

  // Memoized version of the camera position bases on the number of cells in the matrix
  const position = useMemo(() => [2, 1, nDimension + 2], [nDimension]);

  // Memoized version of the matrix, each cell will update autonomously
  const matrix = useMemo(() => {
    const vector: Array<ReactNode> = [];
    const minIndex = nDimension / 2;
    const maxIndex = nDimension / -2;

    for (let x = maxIndex; x < minIndex; x++) {
      for (let y = maxIndex; y < minIndex; y++) {
        for (let z = maxIndex; z < minIndex; z++) {
          vector.push(<Cell key={`${x}${y}${z}`} {...{ x, y, z }} age={x * y * z} />);
        }
      }
    }

    return vector;
  }, []);

  return (
    <Canvas
      camera={{ fov: 75, near: 0.1, far: 1000, position }}
      style={{ height: '100vh' }}
    >
      {/* General lighting */}
      <ambientLight />
      {/* For shadowing purposes */}
      <pointLight position={[10, 10, 10]} />
      {/* Simply allows to "navigate" the canvas */}
      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
      {/* The cell that compose the Automata */}
      {matrix}
    </Canvas>
  );
};

export default SimulationCanvas;
