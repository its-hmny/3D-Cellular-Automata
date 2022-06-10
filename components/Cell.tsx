interface Props {
  x: number;
  y: number;
  z: number;
  age: number;
}

const Cell = ({ x, y, z, age }: Props) => {
  // ! Subscribe this component to the render-loop, rotate the mesh every frame
  // ! useFrame(() => (colorMeshRef.current.rotation.z += 0.01));

  if (age === 0) return null;

  return (
    <mesh scale={0.9} position={[x, y, z]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={age} />
    </mesh>
  );
};

export default Cell;
