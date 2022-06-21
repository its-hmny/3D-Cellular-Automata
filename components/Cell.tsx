import { useFrame } from '@react-three/fiber';
import { MutableRefObject, useMemo, useState } from 'react';
import { Coords } from '../schema/types';

type Props = { position: Coords; ageMatrix: MutableRefObject<Uint8Array | undefined> };

const Cell = ({ position, ageMatrix }: Props) => {
  // Multiplier constant to extract the color code from the cell's age
  const colorBaseMultiplier = 100_000_000;

  // ! age_matrix must be passed as props since React doesn't support context in canvas
  const [color, setColor] = useState<number | undefined>(undefined);

  // The index to be used to retrieve the age counter in the age_matrix (linearized)
  const ageMatrixIndex = useMemo(() => {
    // Destructure the x,y,z coordinates
    const [x, y, z] = position;
    // Extracts the length of only one dimension from the linearized matrix
    const dimension = Math.cbrt(ageMatrix.current?.length ?? 0);
    // Calculates the index at which the vector/buffer must be accessed
    return x + (dimension * y) + (dimension * dimension * z);
  }, [ageMatrix, position]);

  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame(() => {
    // Uses the index to retrieve the age counter in the linearized age_matrix
    const cellAge = ageMatrix.current?.at(ageMatrixIndex) ?? 0;
    // Based on the cellAge sets the cell color
    setColor(cellAge !== 0 ? cellAge * colorBaseMultiplier : undefined);
  });

  return (
    <mesh scale={0.9} position={position}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial visible={color !== undefined} color={color} />
    </mesh>
  );
};

export default Cell;
