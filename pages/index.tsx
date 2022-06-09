import { Button } from '@nextui-org/react';
import { SettingsOption } from 'grommet-icons';
import type { NextPage } from 'next';
import { useState } from 'react';
import Drawer from '../components/Drawer';
import SettingsForm from '../components/SettingsForm';

const Style = {
  // Fab button styling
  Fab: { position: 'fixed', top: '2em', left: '2em', zIndex: 1 },
};

const Home: NextPage = () => {
  // Internal state to open/close the Drawer
  const [isOpen, setOpen] = useState(false);

  return (
    <div id="home">
      {/* Fab Button */}
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

      <Drawer isOpen={isOpen} onClose={() => setOpen(prev => !prev)}>
        <SettingsForm />
      </Drawer>
    </div>
  );
};

export default Home;
