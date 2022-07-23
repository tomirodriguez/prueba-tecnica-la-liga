import { Button, ButtonGroup, Flex, Heading, Spacer } from '@chakra-ui/react';
import { FC } from 'react';
import { useAppDispatch } from '../../../hooks';
import { ResponsiveContainer } from '../../../layouts';
import { logoutRequest } from '../../../store/slices/auth';

export const NavBar: FC = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logoutRequest());
  };

  return (
    <Flex
      w={'full'}
      position={'sticky'}
      top={0}
      bg="white"
      shadow={'2xl'}
      align="center"
      py={2}
    >
      <ResponsiveContainer>
        <Flex minWidth="max-content" alignItems="center" gap="2">
          <Heading size="md">LaLiga App</Heading>
          <Spacer />
          <ButtonGroup gap="2">
            <Button onClick={handleLogout}>Logout</Button>
          </ButtonGroup>
        </Flex>
      </ResponsiveContainer>
    </Flex>
  );
};
