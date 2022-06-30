import { Button, Grid, Input, Radio, theme } from '@nextui-org/react';
import { Checkmark, Close } from 'grommet-icons';
import { useMemo, useState } from 'react';

import { useSimulation } from '../context/Simulation';
import {
  MaxConwayNeighbors,
  MaxDimensionLength,
  MaxVonNeumannNeighbors,
} from '../schema/constant';
import { Settings } from '../schema/types';

type Props = { onDiscard: () => void; onSave: (settings: Settings) => void };

const Style = {
  Section: { mb: '$10' }, // Standard space between each "section" in the form
  Footer: { fg: '1', ai: 'flex-end' }, // The footer has flex-grow:1 but align the content at flex-end
};

const Form = ({ onDiscard, onSave }: Props) => {
  // Retrieves the current simulation settings from context
  const { settings } = useSimulation();

  // Internal state that stores the current/changed settings
  const [newSettings, setNewSettings] = useState(settings);

  // Updates the max number of neighbors available based on the simulation mode
  const MaxNeighbor = useMemo(
    () => (newSettings.mode === 'conway' ? MaxConwayNeighbors : MaxVonNeumannNeighbors),
    [newSettings.mode]
  );

  // TODO Add validation and automatic updates with tools like react-hook-form and yup
  // TODO add seed handling (import, export, generation)

  return (
    <>
      {/* Initial seed management */}
      <Grid.Container gap={2} css={Style.Section}>
        <Grid xs={6} justify="center">
          <Button color="warning" flat auto>
            Generate random seed
          </Button>
        </Grid>
        <Grid xs={6} justify="center">
          <Button color="warning" flat auto>
            Import seed from file
          </Button>
        </Grid>
      </Grid.Container>

      {/* Simulation modes radio buttons */}
      <Grid.Container gap={2} css={Style.Section}>
        <Grid xs={12}>
          <Radio.Group
            label="Simulation mode"
            defaultValue={settings.mode}
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
            max={MaxDimensionLength}
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
            value={newSettings.maxLifeExpectancy}
            helperText="The max age reachable by any given cell"
            onChange={e =>
              setNewSettings({
                ...newSettings,
                maxLifeExpectancy: parseInt(e.target.value, 10),
              })
            }
          />
        </Grid>
        <Grid xs={6}>
          <Input
            type="number"
            color="primary"
            label="Spawn threshold"
            max={MaxNeighbor}
            value={newSettings.spawnThreshold}
            helperText="Number of alive neighbor for a cell to spawn"
            onChange={e =>
              setNewSettings({
                ...newSettings,
                spawnThreshold: parseInt(e.target.value, 10),
              })
            }
          />
        </Grid>
        <Grid xs={6}>
          <Input
            type="number"
            color="primary"
            label="Survive threshold"
            max={MaxNeighbor}
            value={newSettings.surviveThreshold}
            helperText="Number of alive neighbor for a cell to survive"
            onChange={e =>
              setNewSettings({
                ...newSettings,
                surviveThreshold: parseInt(e.target.value, 10),
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
