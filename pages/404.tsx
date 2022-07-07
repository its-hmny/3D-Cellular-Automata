import { Button, Grid, Image, Link, Text } from '@nextui-org/react';
import type { NextPage } from 'next';
import Router from 'next/router';

const NotFound: NextPage = () => {
  return (
    <Grid.Container justify="center" alignItems="center" css={{ h: '100vh' }}>
      {/* Image */}
      <Grid xs={3}>
        <Image src="./logo.png" height="250px" width="253px" alt="Site logo" />
      </Grid>

      {/* Padded container */}
      <Grid.Container xs={6} gap={2}>
        {/* Page title */}
        <Grid xs={12}>
          <Text h1 b>
            404 - Not Found
          </Text>
        </Grid>

        {/* Page description */}
        <Grid xs={12} direction="column">
          <Text h5>
            The page you&apos;re looking for doesn&apos;t seem to exist, please double
            check the URL typed in your browser navbar.
          </Text>
          <Text h5>
            If the problem persist please open a Issue card &nbsp;
            <Link
              color="warning"
              target="_blank"
              href="https://github.com/its-hmny/3D-Cellular-Automata/issues/new"
            >
              here
            </Link>
          </Text>
        </Grid>
        <Grid xs={12}>
          <Button auto flat rounded color="warning" onClick={() => Router.push('/')}>
            Go back to home
          </Button>
        </Grid>
      </Grid.Container>
    </Grid.Container>
  );
};

export default NotFound;
