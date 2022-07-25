import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Button, Circle, ScaleFade, useColorMode } from '@chakra-ui/react';
import { FC } from 'react';

export const ThemeToggler: FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <ScaleFade initialScale={1} in whileHover={{ scale: 1.15 }}>
      <Button
        shadow={'md'}
        boxShadow="lg"
        p="0"
        onClick={toggleColorMode}
        rounded="full"
        _hover={{
          background: colorMode === 'dark' ? 'yellow.400' : 'blue.800',
        }}
      >
        <Circle rounded={'full'} size="35px" bg={'white'}>
          {colorMode === 'dark' ? (
            <SunIcon color={'yellow.400'} boxSize="6" />
          ) : (
            <MoonIcon color={'blue.800'} boxSize="6" />
          )}
        </Circle>
      </Button>
    </ScaleFade>
  );
};
