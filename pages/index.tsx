import { Button } from '@nextui-org/react';
import { SettingsOption } from 'grommet-icons';
import type { NextPage } from 'next';
import { useState } from 'react';
import Automata from '../components/Automata';
import Drawer from '../components/Drawer';
import Form from '../components/Form';
import { useSimulation } from '../context/Simulation';
import { Settings } from '../schema/types';

const Style = {
  // Fab button styling
  Fab: { position: 'fixed', top: '2em', left: '2em', zIndex: 1 },
};

const Home: NextPage = () => {
  const { mutate } = useSimulation();
  // Internal state to open/close the Drawer
  const [isOpen, setOpen] = useState(false);

  // Aggreagate function that mutates the context and closes the modal onSave
  const onSaveSettings = (newSettings: Settings) => {
    mutate(newSettings), setOpen(prev => !prev);
  };

  return (
    <>
      {/* Fab button */}
      <Button
        auto
        flat
        rounded
        color="warning"
        css={Style.Fab}
        icon={<SettingsOption />}
        onClick={() => setOpen(prev => !prev)}
      >
        Settings
      </Button>

      {/* Drawer with settings form */}
      <Drawer isOpen={isOpen} onClose={() => setOpen(prev => !prev)}>
        <Form onDiscard={() => setOpen(prev => !prev)} onSave={onSaveSettings} />
      </Drawer>

      {/* Three.js canvas with full automata rendering */}
      <Automata />
    </>
  );
};

export default Home;
