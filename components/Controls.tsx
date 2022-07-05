import { Button, theme } from '@nextui-org/react';
import { Pause, Play, Redo, RotateLeft } from 'grommet-icons';
import { useCallback, useMemo, useState } from 'react';

import { useSimulation } from '../context/Simulation';

const Controls = () => {
  // Destructure the needed fields and function from context
  const { simulator, setSeed } = useSimulation();

  // Internal state to keep track of the current simulation id to start/stop the latter
  const [simulationId, setSimulationId] = useState<any>();

  // Starts the simulation of with the given settings/simulator
  const start = useCallback(() => {
    // Every 100 milliseconds a new generation is created and set as the current one.
    const intervalId = setInterval(() => simulator.current.NextGeneration(), 100);
    // The interval's id is used more broadly as simulationId
    setSimulationId(intervalId);
  }, [simulator]);

  // Stops the current simulation, it can be resumed later eventually
  const stop = useCallback(() => {
    // If the interval has been already stopped returns early
    if (simulationId === undefined) return;

    clearInterval(simulationId); // Removes the current interval from event loop
    setSimulationId(undefined); // Sets the intervalId state back to undefined
  }, [simulationId]);

  // Stops the current simulation, and reset the simulator by changing the seed
  const step = useCallback(() => {
    stop(); // Stops the current "automatic simulation" (if available)
    // Advances the simulation, deriving a new generation "manually"
    simulator.current.NextGeneration();
  }, [simulator, stop]);

  // Stops the current simulation, and reset the simulator by changing the seed
  const restart = useCallback(() => {
    stop(); // Stops the current "automatic simulation" (if available)
    // This simple trick reallocates the same seed but with a different memory location
    // this signal to React an effective state changes but the state are equal to one another
    setSeed(prev => prev.slice());
  }, [setSeed, stop]);

  // Memoized version of the (shared) props for icons and buttons
  const [ButtonProps, IconProps] = useMemo(() => {
    const button = { auto: true, flat: true, rounded: true, color: 'warning' as const };
    const icon = { color: theme.colors.warning.value };
    return [button, icon];
  }, []);

  return (
    <>
      {/* Dynamically renders "Play"/"Pause" button */}
      {!!simulationId ? (
        <Button {...ButtonProps} icon={<Pause {...IconProps} />} onClick={stop} />
      ) : (
        <Button {...ButtonProps} icon={<Play {...IconProps} />} onClick={start} />
      )}

      {/* "Restart" and "Step" button  */}
      <Button {...ButtonProps} icon={<RotateLeft {...IconProps} />} onClick={restart} />
      <Button {...ButtonProps} icon={<Redo {...IconProps} />} onClick={step} />
    </>
  );
};

export default Controls;
