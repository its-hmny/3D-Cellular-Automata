import { useFrame } from '@react-three/fiber';
import { MutableRefObject, useMemo, useState } from 'react';

type Props = {
  position: [number, number, number];
  age_matrix: MutableRefObject<Buffer | null>;
};

const Cell = ({ position, age_matrix }: Props) => {
  const color_base_multiplier = 100_000_000;
  // ! age_matrix must be passed as props since React doesn't support context in canvas
  const [color, setColor] = useState<number | undefined>(undefined);

  // The index to be used to retrieve the age counter in the age_matrix (linearized)
  const age_matrix_idx = useMemo(() => {
    // Destructure the x,y,z coordinates
    const [x, y, z] = position;
    // Extracts the length of only one dimension from the linearized matrix
    const linearized_dim = age_matrix.current?.length ?? 0;
    const dimension = Math.cbrt(linearized_dim);
    // Calculates the index at which the vector/buffer must be accessed
    return x + dimension * y + dimension * dimension * z;
  }, [age_matrix, position]);

  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame(() => {
    // Uses the index to retrieve the age counter in the linearized age_matrix
    const cellAge = age_matrix.current?.at(age_matrix_idx) ?? 0;
    // Based on the cellAge sets the cell color
    setColor(cellAge !== 0 ? cellAge * color_base_multiplier : undefined);
  });

  return (
    <mesh scale={0.9} position={position}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial visible={color !== undefined} color={color} />
    </mesh>
  );
};

export default Cell;
