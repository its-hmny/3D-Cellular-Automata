import { Button, theme } from '@nextui-org/react';
import { Pause, Play, Redo, RotateLeft } from 'grommet-icons';
import { useCallback, useMemo, useState } from 'react';

import { useSimulation } from '../context/Simulation';

const Controls = () => {
  // Destructure the needed fields and function from SimulationContext
  const { simulator, setSeed } = useSimulation();

  // Internal state to keep track of the current simulation id to start/stop the latter
  const [simulationId, setSimulationId] = useState<NodeJS.Timer | undefined>();

  // Memoized version of the (shared) props for icons and buttons
  const [ButtonProps, IconProps] = useMemo(() => {
    const button = { auto: true, flat: true, rounded: true, color: 'warning' as const };
    const icon = { color: theme.colors.warning.value };
    return [button, icon];
  }, []);

  // Starts/Resume the "automatic" simulation.
  const start = useCallback(() => {
    // Every 100 milliseconds a new generation is created and set as the current one.
    const intervalId = setInterval(() => simulator.current.NextGeneration(), 100);
    // The interval's id is used more broadly as simulationId
    setSimulationId(intervalId);
  }, [simulator]);

  // Stops the current simulation (can be resumed later).
  const stop = useCallback(() => {
    // If the interval has been already stopped returns early
    if (simulationId === undefined) return;

    clearInterval(simulationId); // Removes the current interval from event loop
    setSimulationId(undefined); // Sets the intervalId state back to undefined
  }, [simulationId]);

  // Stops the current simulation, and allows the user to proceed one generation at time.
  const step = useCallback(() => {
    // Stops the current "automatic simulation" (if available)
    stop(); 
    // Advances the simulation by deriving a new generation "manually"
    simulator.current.NextGeneration();
  }, [simulator, stop]);

  // Stops the current simulation, and resets the simulator to its initial state
  const restart = useCallback(() => {
    // Stops the current "automatic simulation" (if available)
    stop();
    // This simple trick reallocates the same seed but with a different memory location
    // this signal to React an effective state changes but the state are equal to one another
    setSeed(prev => prev.slice());
  }, [setSeed, stop]);

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
