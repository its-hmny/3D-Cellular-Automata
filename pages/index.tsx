import { Button, Grid, theme } from '@nextui-org/react';
import { Pause, Play, SettingsOption } from 'grommet-icons';
import type { NextPage } from 'next';
import { useCallback, useMemo, useState } from 'react';

import Automaton from '../components/Automaton';
import Drawer from '../components/Drawer';
import Form from '../components/Form';
import SEO from '../components/SEO';
import { useSimulation } from '../context/Simulation';
import { Settings } from '../schema/types';

const Style = {
  // Fab button styling
  Fab: { width: '200px', position: 'fixed', top: '2em', left: '2em', zIndex: 1 },
};

const Home: NextPage = () => {
  // Retrieves the mutator function for the SimulationContext
  const { mutate, isActive, start, stop } = useSimulation();

  // Internal state to open/close the Drawer
  const [isOpen, setOpen] = useState(false);

  const [icon, onClick] = useMemo(() => {
    const iconProps = { color: theme.colors.warning.value };
    // eslint-disable-next-line react/jsx-key
    if (isActive) return [<Pause {...iconProps} />, stop];
    // eslint-disable-next-line react/jsx-key
    else return [<Play {...iconProps} />, start];
  }, [isActive, start, stop]);

  // Aggregate function that mutates the context and closes the modal onSave
  const onSaveSettings = useCallback(
    (newSettings: Settings) => (mutate(newSettings), setOpen(prev => !prev)),
    [mutate]
  );

  return (
    <>
      {/* Metadata, Title and SEO optimizations */}
      <SEO />

      {/* Fab settings button */}
      <Grid.Container justify="space-around" css={Style.Fab}>
        <Button
          auto
          flat
          rounded
          color="warning"
          icon={<SettingsOption color={theme.colors.warning.value} />}
          onClick={() => setOpen(prev => !prev)}
        >
          Settings
        </Button>
        <Button auto flat rounded color="warning" icon={icon} onClick={onClick} />
      </Grid.Container>

      {/* Drawer with settings form */}
      <Drawer isOpen={isOpen} onClose={() => setOpen(prev => !prev)}>
        <Form onDiscard={() => setOpen(prev => !prev)} onSave={onSaveSettings} />
      </Drawer>

      {/* Three.js canvas with full automaton rendering */}
      <Automaton />
    </>
  );
};

export default Home;
