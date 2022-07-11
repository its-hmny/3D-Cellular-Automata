import { Button, Grid, Input, Radio, theme } from '@nextui-org/react';
import { Checkmark, Close } from 'grommet-icons';
import { useCallback, useState } from 'react';

import { CreateRandomSeed, ExportSeed, ImportSeed } from '../automata/seed';
import { useSimulation } from '../context/Simulation';
import { MaxValues } from '../schema/constant';
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

  // Internal state that stores the current/changed settings
  const [newSettings, setNewSettings] = useState({ ...settings });

  // Generates and sets a new random seed
  const SeedRandom = useCallback(
    () => setSeed(CreateRandomSeed(settings.dimension, settings.max_states)),
    [setSeed, settings.dimension, settings.max_states]
  );

  // Imports and generates a seed from a file provided by the user
  const SeedImport = useCallback(() => ImportSeed(setSeed), [setSeed]);

  // Exports the current seed to a JSON files
  const SeedExport = useCallback(
    // TODO This sucks, fix it
    () => setSeed(current => (ExportSeed(current), current)),
    [setSeed]
  );

  // TODO Add validation and automatic updates with tools like react-hook-form and yup

  return (
    <>
      {/* Initial seed management */}
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
          <Radio.Group
            label="Simulation mode"
            defaultValue={settings.mode}
            // @ts-ignore
            onChange={value => setNewSettings({ ...newSettings, mode: value })}
          >
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
      </Grid.Container>

      {/* Thresholds, automaton dimension and max life expectancy */}
      <Grid.Container gap={2} css={Style.Section}>
        <Grid xs={6}>
          <Input
            type="number"
            color="primary"
            label="Matrix size"
            value={newSettings.dimension}
            max={MaxValues.Dimension}
            helperText="The number of cell per side in the matrix"
            onChange={e =>
              setNewSettings({ ...newSettings, dimension: parseInt(e.target.value, 10) })
            }
          />
        </Grid>
        <Grid xs={6}>
          <Input
            type="number"
            color="primary"
            label="Life states"
            value={newSettings.max_states}
            helperText="The max age reachable by any given cell"
            onChange={e =>
              setNewSettings({
                ...newSettings,
                max_states: parseInt(e.target.value, 10),
              })
            }
          />
        </Grid>
        <Grid xs={6}>
          <Input
            type="number"
            color="primary"
            label="Spawn threshold"
            value={newSettings.lim_spawn}
            max={MaxValues.Neighbors[newSettings.mode]}
            helperText="Number of alive neighbor for a cell to spawn"
            onChange={e =>
              setNewSettings({
                ...newSettings,
                lim_spawn: parseInt(e.target.value, 10),
              })
            }
          />
        </Grid>
        <Grid xs={6}>
          <Input
            type="number"
            color="primary"
            label="Survive threshold"
            value={newSettings.lim_survive}
            max={MaxValues.Neighbors[newSettings.mode]}
            helperText="Number of alive neighbor for a cell to survive"
            onChange={e =>
              setNewSettings({
                ...newSettings,
                lim_survive: parseInt(e.target.value, 10),
              })
            }
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
            onClick={() => onSave(newSettings)}
          >
            Save
          </Button>
        </Grid>
      </Grid.Container>
    </>
  );
};

export default Form;
