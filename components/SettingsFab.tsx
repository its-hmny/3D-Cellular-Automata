import { SettingsIcon } from '@chakra-ui/icons';
import { Box, IconButton, useDisclosure } from '@chakra-ui/react';
import SettingsDrawer from './SettingsDrawer';

const SettingsFab = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box position="fixed" top="10" left={['5', '10']} zIndex={1}>
      {/* "Open drawer" button */}
      <IconButton
        aria-label="Change configuration"
        icon={<SettingsIcon />}
        colorScheme="teal"
        borderRadius="30"
        onClick={onOpen}
      />

      {/* Floating drawer */}
      <SettingsDrawer open={isOpen} close={onClose} />
    </Box>
  );
};

export default SettingsFab;
