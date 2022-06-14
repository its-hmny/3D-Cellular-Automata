import { MeshStandardMaterialProps, useFrame } from '@react-three/fiber';
import { MutableRefObject, useMemo, useRef } from 'react';

type Props = {
  position: [number, number, number];
  age_matrix: MutableRefObject<Buffer | null>;
};

const Cell = ({ position, age_matrix }: Props) => {
  // ! age_matrix must be passed as props since React doesn't support context in canvas
  // Reference to the mesh standard material (MSM) component
  const msm_ref = useRef<MeshStandardMaterialProps>(null);

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
    // If the mesh reference hasn't been populated skips the current frame
    if (!msm_ref.current) return;

    // Uses the index to retrieve the age counter in the linearized age_matrix
    const cellAge = age_matrix.current?.at(age_matrix_idx) ?? 0;
    // TODO Complete this hook
    // ? msmRef.current.visible = cellAge !== 0;
    // ? msmRef.current.color = cellAge + 1 * 25_000;
  });

  return (
    <mesh scale={0.9} position={position}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial ref={msm_ref} color="orange" />
    </mesh>
  );
};

export default Cell;
