import { Button, Grid, Input, Radio, Spacer, Text } from '@nextui-org/react';
import { Checkmark, Close, Refresh, UploadOption } from 'grommet-icons';

const SettingsForm = () => {
  return (
    <Grid.Container gap={2}>
      <Grid xs={6} justify="center">
        <Button color="primary" flat auto>
          Generate random seed
        </Button>
      </Grid>
      <Grid xs={6} justify="center">
        <Button color="primary" flat auto>
          Import seed from file
        </Button>
      </Grid>

      {/* Spacing */}
      <Grid xs={12}>
        <Spacer y={1} />
      </Grid>

      <Grid xs={12}>
        <Radio.Group label="Options" defaultValue="conway">
          <Radio
            size="sm"
            value="conway"
            description="Evaluates only the 6 face adjacent neighbors"
          >
            Conway
          </Radio>
          <Radio
            size="sm"
            value="von-neumann"
            description="Evaluates the whole 26 neighbors"
          >
            Von Neumann
          </Radio>
        </Radio.Group>
      </Grid>

      {/* Spacing */}
      <Grid xs={12}>
        <Spacer y={1} />
      </Grid>

      <Grid xs={6}>
        <Input
          type="number"
          color="primary"
          label="Matrix size"
          helperText="The number of cell per side in the matrix"
        />
      </Grid>
      <Grid xs={6}>
        <Input
          type="number"
          color="primary"
          label="Life states"
          helperText="The max age reachable by any given cell"
        />
      </Grid>
      <Grid xs={6}>
        <Input
          type="number"
          color="primary"
          label="Spawn threshold"
          helperText="Number of alive neighbor for a cell to spawn"
        />
      </Grid>
      <Grid xs={6}>
        <Input
          type="number"
          color="primary"
          label="Survive threshold"
          helperText="Number of alive neighbor for a cell to survive"
        />
      </Grid>

      {/* Spacing */}
      <Grid xs={12}>
        <Spacer y={7.5} />
      </Grid>

      <Grid xs={6}>
        <Button color="error" flat icon={<Close />}>
          Discard
        </Button>
      </Grid>
      <Grid xs={6}>
        <Button color="success" flat icon={<Checkmark />}>
          Save
        </Button>
      </Grid>
    </Grid.Container>
  );
};

export default SettingsForm;
