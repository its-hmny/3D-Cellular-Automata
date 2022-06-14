import { MeshStandardMaterialProps, useFrame } from '@react-three/fiber';
import { MutableRefObject, useMemo, useRef } from 'react';

type Props = { x: number; y: number; z: number; matrix: MutableRefObject<Buffer> };

const Cell = ({ x, y, z, matrix }: Props) => {
  // ! Matrix must be passed as props since React doesn't support ContextProvider in canvas

  // The index to be used to retrieve the age counter in the matrix (linearized)
  const matrixIdx = useMemo(() => {
    const dimension = Math.cbrt(matrix.current.length);
    return x + dimension * y + dimension * dimension * z;
  }, [matrix, x, y, z]);

  // Reference to the mesh standard material (MSM) component
  const msmRef = useRef<MeshStandardMaterialProps>(null);

  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame(() => {
    if (!msmRef.current) return;
    const cellAge = matrix.current.at(matrixIdx) ?? 0;
    msmRef.current.visible = cellAge !== 0;
    msmRef.current.color = cellAge + 1 * 25_000;
  });

  return (
    <mesh scale={0.9} position={[x, y, z]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial ref={msmRef} />
    </mesh>
  );
};

export default Cell;
