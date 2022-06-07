import { CloseIcon, RepeatIcon } from '@chakra-ui/icons';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from '@chakra-ui/react';
import SettingsForm from './SettingsForm';

type SettingDrawerProps = { open: boolean; close: () => void };

const SettingsDrawer = ({ open, close }: SettingDrawerProps) => (
  <Drawer placement="left" size="sm" isOpen={open} onClose={close}>
    <DrawerContent>
      {/* Drawer title + close icon */}
      <DrawerCloseButton />
      <DrawerHeader>Change the simulation rules</DrawerHeader>

      {/* Main content, simulation settings form */}
      <DrawerBody>
        <SettingsForm onDiscard={close} onSave={console.log} />
      </DrawerBody>

      {/* Drawer footer with CtAs */}
      <DrawerFooter justifyContent="space-around">
        <Button variant="outline" leftIcon={<CloseIcon />} onClick={close}>
          Discard changes
        </Button>
        <Button colorScheme="teal" leftIcon={<RepeatIcon />} onClick={() => {}}>
          Restart simulation
        </Button>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
);

export default SettingsDrawer;
