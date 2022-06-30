import { useFrame } from '@react-three/fiber';
import { MutableRefObject, useMemo, useState } from 'react';

import { Coords } from '../schema/types';

type Props = { position: Coords; ageMatrix: MutableRefObject<Uint8Array | undefined> };

// ! NOTE: age_matrix must be passed as props since React doesn't support context in canvas
const Cell = ({ position, ageMatrix }: Props) => {
  // Multiplier constant to compute the cell's color code from the its age
  const colorBaseMultiplier = 100_000_000;

  // Current color of the cell, when undefined the cell is hidden/transparent
  const [color, setColor] = useState<number | undefined>(undefined);

  // The index to be used to retrieve the cell's age in the age_matrix (linearized)
  const ageMatrixIndex = useMemo(() => {
    // Destructure the x,y,z coordinates
    const [x, y, z] = position;
    // Extracts the length of only one dimension from the linearized matrix
    const dimension = Math.cbrt(ageMatrix.current?.length ?? 0);
    // Calculates the index at which the vector/buffer must be accessed
    return x + dimension * y + dimension ** 2 * z;
  }, [ageMatrix, position]);

  // Subscribe this component to the render-loop, updates the color when the age has changed
  useFrame(() => {
    // Uses the index to retrieve the age counter in the linearized age_matrix
    const cellAge = ageMatrix.current?.at(ageMatrixIndex) ?? 0;
    // Computes the current cell color code, if the cellAge is zero the color is undefined
    const cellColor = cellAge * colorBaseMultiplier || undefined;
    // Iif the color has changed the state is updated, avoids useless rerenders
    color !== cellColor && setColor(cellColor);
  });

  return (
    <mesh scale={0.9} position={position}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial visible={color !== undefined} color={color} />
    </mesh>
  );
};

export default Cell;
