import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Button, ScaleFade, useColorMode } from '@chakra-ui/react';
import { FC } from 'react';

export const ThemeToggler: FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <ScaleFade initialScale={1} in whileHover={{ scale: 1.18 }}>
      <Button
        title="Toggle dark mode"
        shadow={'md'}
        boxShadow="lg"
        p="0"
        onClick={toggleColorMode}
        rounded="full"
        _hover={{
          background: 'transparent',
        }}
        _focus={{ background: 'transparent' }}
        _active={{ background: 'transparent' }}
      >
        {colorMode === 'dark' ? (
          <SunIcon color={'yellow.400'} boxSize="6" />
        ) : (
          <MoonIcon color={'blue.500'} boxSize="6" />
        )}
      </Button>
    </ScaleFade>
  );
};
