import { Button, theme } from '@nextui-org/react';
import { Pause, Play } from 'grommet-icons';
import { useCallback, useMemo, useState } from 'react';

import { useSimulation } from '../context/Simulation';

const Controls = () => {
  // TODO COMMENT
  const { simulator } = useSimulation();

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
    clearInterval(simulationId), setSimulationId(undefined);
  }, [simulationId]);

  const [icon, onClick] = useMemo(() => {
    const iconProps = { color: theme.colors.warning.value };
    // eslint-disable-next-line react/jsx-key
    if (!!simulationId) return [<Pause {...iconProps} />, stop];
    // eslint-disable-next-line react/jsx-key
    else return [<Play {...iconProps} />, start];
  }, [simulationId, start, stop]);

  return <Button auto flat rounded color="warning" icon={icon} onClick={onClick} />;
};

export default Controls;
