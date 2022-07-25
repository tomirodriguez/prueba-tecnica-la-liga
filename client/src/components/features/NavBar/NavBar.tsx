import {
  Box,
  ButtonGroup,
  Flex,
  Heading,
  Spacer,
  useColorMode,
} from '@chakra-ui/react';
import { FC } from 'react';
import { useLogout } from '../../../hooks';
import { ResponsiveContainer } from '../../../layouts';
import { PrimaryButton } from '../../ui';
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
      color="white"
      shadow={'2xl'}
      align="center"
      py={2}
    >
      <ResponsiveContainer>
        <Flex minWidth="max-content" alignItems="center" gap="2">
          <Heading size="md">LaLiga App</Heading>
          <Spacer />

          <Box mr="4">
            <ThemeToggler />
          </Box>

          <ButtonGroup gap="2">
            <PrimaryButton onClick={logout}>Cerrar Sesión</PrimaryButton>
          </ButtonGroup>
        </Flex>
      </ResponsiveContainer>
    </Flex>
  );
};
