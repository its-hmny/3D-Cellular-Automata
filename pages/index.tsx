import { Button, theme } from '@nextui-org/react';
import { SettingsOption } from 'grommet-icons';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useCallback, useState } from 'react';

import Automaton from '../components/Automaton';
import Drawer from '../components/Drawer';
import Form from '../components/Form';
import { useSimulation } from '../context/Simulation';
import { Settings } from '../schema/types';

const Style = {
  // Fab button styling
  Fab: { position: 'fixed', top: '2em', left: '2em', zIndex: 1 },
};

const Home: NextPage = () => {
  // Retrieves the mutator function for the SimulationContext
  const { mutate } = useSimulation();

  // Internal state to open/close the Drawer
  const [isOpen, setOpen] = useState(false);

  // Aggregate function that mutates the context and closes the modal onSave
  const onSaveSettings = useCallback(
    (newSettings: Settings) => (mutate(newSettings), setOpen(prev => !prev)),
    [mutate]
  );

  // TODO move <Head> tag content to SEO component

  return (
    <>
      {/* Metadata, Title and SEO optimizations */}
      <Head>
        {/* Browser's tab appearance */}
        <title>3D Cellular Automata</title>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />

        {/* General metadata (title, description, author) */}
        <meta name="language" content="English" />
        <meta name="title" content="3D Cellular Automata" />
        <meta name="author" content="Enea Guidi (its-hmny)" />
        <meta name="description" content="A Three.js webapp to simulate cellular automata in 3D" />
        <meta name="keywords" content="cellular automata,3D,conway,game of life,three.js,react" />

        {/* Other metatags */}
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      </Head>

      {/* Fab settings button */}
      <Button
        auto
        flat
        rounded
        color="warning"
        css={Style.Fab}
        icon={<SettingsOption color={theme.colors.warning.value} />}
        onClick={() => setOpen(prev => !prev)}
      >
        Settings
      </Button>

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
