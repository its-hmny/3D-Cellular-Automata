import { Grid, Input, Radio, Spacer, Text } from '@nextui-org/react';

const SettingsForm = () => {
  return (
    <Grid.Container gap={2}>
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
    </Grid.Container>
  );
};

export default SettingsForm;
