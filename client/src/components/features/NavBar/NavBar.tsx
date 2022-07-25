import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Spacer,
  useColorMode,
} from '@chakra-ui/react';
import { FC } from 'react';
import { useLogout } from '../../../hooks';
import { ResponsiveContainer } from '../../../layouts';
import { ThemeToggler } from './ThemeToggler';

export const NavBar: FC = () => {
  const logout = useLogout();
  const { colorMode } = useColorMode();

  return (
    <Flex
      w={'full'}
      position={'sticky'}
      top={0}
      bg={`${colorMode}.primary.main`}
      shadow={'2xl'}
      align="center"
      py={2}
    >
      <ResponsiveContainer>
        <Flex minWidth="max-content" alignItems="center" gap="2">
          <Heading size="md" color="white">
            LaLiga App
          </Heading>
          <Spacer />

          <Box mr="4">
            <ThemeToggler />
          </Box>

          <ButtonGroup gap="2">
            <Button
              onClick={logout}
              bg={'transparent'}
              color="white"
              _focus={{ outline: 'none' }}
              _hover={{ color: 'white', bg: 'red.500' }}
            >
              Cerrar Sesión
            </Button>
          </ButtonGroup>
        </Flex>
      </ResponsiveContainer>
    </Flex>
  );
};
