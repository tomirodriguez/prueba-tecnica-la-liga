import { Flex } from '@chakra-ui/react';
import { Navigate } from 'react-router-dom';
import { Authentication } from '../components/features';
import { useAuthSelector } from '../redux';

export const LoginPage = () => {
  const { user } = useAuthSelector();

  if (user) return <Navigate to={'/clubs'} />;

  return (
    <Flex
      as={'main'}
      w="full"
      h="100vh"
      bg="bg"
      flexDir="column"
      justify="center"
      align="center"
      padding={30}
    >
      <Authentication />
    </Flex>
  );
};
