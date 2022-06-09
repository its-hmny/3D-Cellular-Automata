import { Button } from '@nextui-org/react';
import { SettingsOption } from 'grommet-icons';
import type { NextPage } from 'next';
import { useState } from 'react';
import Drawer from '../components/Drawer';

const Home: NextPage = () => {
  // Internal state to open/close the Drawer
  const [isOpen, setOpen] = useState(false);

  return (
    <div id="home">
      <Button
        auto
        flat
        rounded
        color="warning"
        className="fab"
        icon={<SettingsOption />}
        onClick={() => setOpen(prev => !prev)}
      >
        Settings
      </Button>

      <Drawer isOpen={isOpen} onClose={() => setOpen(prev => !prev)} />
    </div>
  );
};

export default Home;
