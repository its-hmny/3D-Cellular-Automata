import { CloseIcon, RepeatIcon, SettingsIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Heading,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';

type SettingsFabProps = { onClick: () => void };

const SettingsFab = ({ onClick }: SettingsFabProps) => (
  <Box position="fixed" top="10" left={['5', '10']} zIndex={1}>
    <IconButton
      aria-label="Change configuration"
      icon={<SettingsIcon />}
      colorScheme="teal"
      borderRadius="30"
      onClick={onClick}
    />
  </Box>
);

type SettingDrawerProps = { open: boolean; onDiscard: () => void };

const SettingsDrawer = ({ open, onDiscard }: SettingDrawerProps) => (
  <Drawer placement="left" size="sm" isOpen={open} onClose={onDiscard}>
    <DrawerContent>
      <DrawerHeader>Change the simulation rules</DrawerHeader>
      <DrawerCloseButton />

      <DrawerBody>
        <Heading>TODO add control</Heading>
      </DrawerBody>

      <DrawerFooter justifyContent="space-around">
        <Button variant="outline" leftIcon={<CloseIcon />} onClick={onDiscard}>
          Discard changes
        </Button>
        <Button colorScheme="teal" leftIcon={<RepeatIcon />} onClick={() => {}}>
          Restart simulation
        </Button>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
);

const Settings = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <SettingsFab onClick={onOpen} />
      <SettingsDrawer open={isOpen} onDiscard={onClose} />
    </>
  );
};

export default Settings;
