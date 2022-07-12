import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Grid, Input, Radio, theme } from '@nextui-org/react';
import { Checkmark, Close } from 'grommet-icons';
import { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { CreateRandomSeed, ExportSeed, ImportSeed } from '../automata/seed';
import { useSimulation } from '../context/Simulation';
import { SettingsSchema } from '../schema/constant';
import { Settings } from '../schema/types';

type Props = { onDiscard: () => void; onSave: (settings: Settings) => void };

const Style = {
  // Standard space between each "section" in the form
  Section: { mb: '$10' },
  // The footer has flex-grow:1 but align the content at flex-end
  Footer: { fg: '1', ai: 'flex-end' },
};

const Form = ({ onDiscard, onSave }: Props) => {
  // Retrieves the current simulation settings from context
  const { settings, setSeed } = useSimulation();

  // react-hook-form setup and initializations
  const { control, register, handleSubmit, formState } = useForm({
    mode: 'onBlur',
    defaultValues: settings,
    resolver: yupResolver(SettingsSchema),
  });

  // Helper function to determine if an input field is valid or invalid
  const isValid = useCallback(
    (name: keyof Settings, defaultMsg: string) => {
      // If an error is not present then the user will be showed a simple explanatory msg
      if (!formState.errors[name])
        return { helperText: defaultMsg, color: 'primary' } as const;

      // When an error is present the field will become red and present a msg to the user
      return { helperText: formState.errors[name]?.message, color: 'error' } as const;
    },
    [formState.errors]
  );

  // Generates and sets a new random seed
  const SeedRandom = useCallback(
    () => setSeed(CreateRandomSeed(settings.dimension, settings.max_states)),
    [setSeed, settings.dimension, settings.max_states]
  );

  // Imports and generates a seed from a file provided by the user
  const SeedImport = useCallback(() => ImportSeed(setSeed), [setSeed]);

  // Exports the current seed to a JSON files
  const SeedExport = useCallback(
    // TODO The current implementation sucks, must fix it
    () => setSeed(current => (ExportSeed(current), current)),
    [setSeed]
  );

  return (
    <>
      {/* Seed management (random/import/export) */}
      <Grid.Container gap={2} css={Style.Section}>
        <Grid xs={4} justify="center">
          <Button color="warning" flat auto onClick={SeedRandom}>
            Random seed
          </Button>
        </Grid>
        <Grid xs={4} justify="center">
          <Button color="warning" flat auto onClick={SeedImport}>
            Import seed
          </Button>
        </Grid>
        <Grid xs={4} justify="center">
          <Button color="warning" flat auto onClick={SeedExport}>
            Export seed
          </Button>
        </Grid>
      </Grid.Container>

      {/* Simulation modes radio buttons */}
      <Grid.Container gap={2} css={Style.Section}>
        <Grid xs={12}>
          <Controller
            name="mode"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Radio.Group label="Simulation mode" value={value} onChange={onChange}>
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
            )}
          />
        </Grid>
      </Grid.Container>

      {/* Thresholds, automaton dimension and max life expectancy */}
      <Grid.Container gap={2} css={Style.Section}>
        <Grid xs={6}>
          <Input
            type="number"
            label="Matrix size"
            {...register('dimension')}
            {...isValid('dimension', 'The number of cell per side in the matrix')}
          />
        </Grid>
        <Grid xs={6}>
          <Input
            type="number"
            label="Life states"
            {...register('max_states')}
            {...isValid('max_states', 'The max age reachable by any given cell')}
          />
        </Grid>
        <Grid xs={6}>
          <Input
            type="number"
            label="Spawn threshold"
            {...register('lim_spawn')}
            {...isValid('lim_spawn', 'Number of alive neighbor for a cell to spawn')}
          />
        </Grid>
        <Grid xs={6}>
          <Input
            type="number"
            label="Survive threshold"
            {...register('lim_survive')}
            {...isValid('lim_survive', 'Number of alive neighbor for a cell to survive')}
          />
        </Grid>
      </Grid.Container>

      {/* Finalizing actions (save or discard) */}
      <Grid.Container gap={2} css={Style.Footer}>
        <Grid xs={6}>
          <Button
            flat
            color="error"
            icon={<Close color={theme.colors.error.value} />}
            onClick={onDiscard}
          >
            Discard
          </Button>
        </Grid>
        <Grid xs={6}>
          <Button
            flat
            color="success"
            icon={<Checkmark color={theme.colors.success.value} />}
            onClick={handleSubmit(onSave)}
          >
            Save
          </Button>
        </Grid>
      </Grid.Container>
    </>
  );
};

export default Form;
