import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Button, Circle, ScaleFade } from '@chakra-ui/react';
import { FC } from 'react';
import { useIsDarkMode } from '../../../hooks';

export const ThemeToggler: FC = () => {
  const { isDarkMode, toggleDarkMode } = useIsDarkMode();

  return (
    <ScaleFade initialScale={1} in whileHover={{ scale: 1.15 }}>
      <Button
        shadow={'md'}
        boxShadow="lg"
        p="0"
        onClick={toggleDarkMode}
        rounded="full"
        _hover={{ background: isDarkMode ? 'yellow.400' : 'blue.800' }}
      >
        <Circle rounded={'full'} size="35px" bg={'white'}>
          {isDarkMode ? (
            <SunIcon color={'yellow.400'} boxSize="6" />
          ) : (
            <MoonIcon color={'blue.800'} boxSize="6" />
          )}
        </Circle>
      </Button>
    </ScaleFade>
  );
};
