import {
  Box,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Radio,
  RadioGroup,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from '@chakra-ui/react';
import { SimulationSettings } from '../context/Simulation';

type SettingsFormProps = {
  onSave: (newSettings: Partial<SimulationSettings>) => void;
  onDiscard: () => void;
};

const SettingsForm = ({ onSave, onDiscard }: SettingsFormProps) => {
  return (
    <>
      <FormControl id="mode">
        <FormLabel>Simulation mode:</FormLabel>
        <RadioGroup defaultValue="conway">
          <HStack spacing="24">
            <Radio value="conway" colorScheme="teal">
              Conway
            </Radio>
            <Radio value="von-neumann" colorScheme="teal">
              Von Neumann
            </Radio>
          </HStack>
        </RadioGroup>
        {/* <FormHelperText>Select only if you're a fan.</FormHelperText> */}
      </FormControl>

      <FormControl id="survival_threshold">
        <FormLabel>Survival threshold:</FormLabel>
        <Slider defaultValue={15} min={0} max={26}>
          <SliderTrack>
            <Box position="relative" right={10} />
            <SliderFilledTrack bg="teal" />
          </SliderTrack>
          <SliderThumb />
        </Slider>
        {/* <FormHelperText>Select only if you're a fan.</FormHelperText> */}
      </FormControl>

      <FormControl id="spawn_threshold">
        <FormLabel>Spawn threshold:</FormLabel>
        <Slider defaultValue={15} min={0} max={26}>
          <SliderTrack>
            <Box position="relative" right={10} />
            <SliderFilledTrack bg="teal" />
          </SliderTrack>
          <SliderThumb />
        </Slider>
        {/* <FormHelperText>Select only if you're a fan.</FormHelperText> */}
      </FormControl>

      <FormControl id="life_states">
        <FormLabel>Life states:</FormLabel>
        <Slider defaultValue={15} min={0} max={26}>
          <SliderTrack>
            <Box position="relative" right={10} />
            <SliderFilledTrack bg="teal" />
          </SliderTrack>
          <SliderThumb />
        </Slider>
        {/* <FormHelperText>Select only if you're a fan.</FormHelperText> */}
      </FormControl>
    </>
  );
};

export default SettingsForm;
