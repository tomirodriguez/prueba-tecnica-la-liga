import { Flex, Spinner, Text } from '@chakra-ui/react';
import { FC } from 'react';

export const LoadingScreen: FC = () => {
  return (
    <Flex
      position={'fixed'}
      direction="column"
      w="100vw"
      h="100vh"
      zIndex={99}
      bg="black"
      justify={'center'}
      align="center"
    >
      <Text color={'yellow'} mb="4">
        ACA VA EL LOGO
      </Text>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Flex>
  );
};
