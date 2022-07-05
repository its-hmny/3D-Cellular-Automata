import { useFrame } from '@react-three/fiber';
import { MutableRefObject, useState } from 'react';

import { Simulator } from '../automata/simualtor';
import { Coords } from '../schema/types';

type Props = {
  id: number;
  coords: Coords;
  simulator: MutableRefObject<Simulator>;
};

// ! NOTE: age_matrix must be passed as props since React doesn't support context in canvas
const Cell = ({ id, coords, simulator }: Props) => {
  // Multiplier constant to compute the cell's color code from the its age
  const colorBaseMultiplier = 100_000_000;

  // Current color of the cell, when undefined the cell is hidden/transparent
  const [color, setColor] = useState<number | undefined>(undefined);

  // Subscribe this component to the render-loop, updates the color when the age has changed
  useFrame(() => {
    // Uses the id as index to retrieve the age counter in the linearized age_matrix
    const cellAge = simulator.current.CurrentGeneration().at(id) ?? 0;
    // Computes the current cell color code, if the cellAge is zero the color is undefined
    const cellColor = cellAge * colorBaseMultiplier || undefined;
    // Iif the color has changed the state is updated, avoids useless rerenders
    color !== cellColor && setColor(cellColor);
  });

  return (
    <mesh scale={0.9} position={coords}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial visible={color !== undefined} color={color} />
    </mesh>
  );
};

export default Cell;
