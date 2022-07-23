import { Flex } from '@chakra-ui/react';
import { Authentication } from '../components/features/Authentication';

export const LoginPage = () => {
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
