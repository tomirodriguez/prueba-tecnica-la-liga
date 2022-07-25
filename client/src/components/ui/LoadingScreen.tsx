import { Flex, Spinner, useColorMode, Text } from '@chakra-ui/react';
import { FC } from 'react';

export const LoadingScreen: FC = () => {
  const { colorMode } = useColorMode();
  return (
    <Flex
      position={'fixed'}
      direction="column"
      w="100vw"
      h="100vh"
      zIndex={99}
      bg={`${colorMode}.bg.main`}
      justify={'center'}
      align="center"
    >
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color={`${colorMode}.secondary.main`}
        size="xl"
      />
      <Text mt="4">Verificando sesión ...</Text>
    </Flex>
  );
};
