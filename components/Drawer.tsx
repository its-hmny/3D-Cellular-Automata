import { Card, Grid, Text } from '@nextui-org/react';
import { Close } from 'grommet-icons';
const Style = {
  // Drawer's general styling
  Drawer: {
    height: '97vh',
    maxWidth: '30em',
    position: 'fixed',

    zIndex: 5,
    top: '1.5vh',
    left: '0.5em',
    padding: '0px',
  },

  // Drawer's subtitle styling
  Subtitle: { color: '$accents8' },
};

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const Drawer = ({ isOpen, onClose }: DrawerProps) => {
  // Drawer closed, nothing to show
  if (!isOpen) return <></>;

  return (
    <Card isHoverable css={Style.Drawer}>
      {/* Drawer Header */}
      <Card.Header>
        <Grid.Container gap={1}>
          <Grid xs={12} direction="row" justify="space-between" alignItems="center">
            <Text h3>Simulation settings</Text>
            <Close onClick={onClose} />
          </Grid>
          <Grid xs={12}>
            <Text css={{ color: '$accents8' }}>
              Here you will be able to tweak your simulation settings. <br />
              Different simulation settings with the same initial seed could generate
              radically different Cellular Automata.
              <br />
            </Text>
          </Grid>
        </Grid.Container>
      </Card.Header>
      <Card.Body>
        <Grid.Container gap={1}>
          <Grid xs={12}>
            <Text h6 size={15}>
              NextUI gives you the best developer experience with all the features you
              need for building beautiful and modern websites and applications.
            </Text>
          </Grid>
        </Grid.Container>
      </Card.Body>
    </Card>
  );
};

export default Drawer;
