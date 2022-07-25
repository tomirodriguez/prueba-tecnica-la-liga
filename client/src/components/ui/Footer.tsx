import { Flex, Text } from '@chakra-ui/react';
import { FC } from 'react';

export const Footer: FC = () => {
  return (
    <Flex
      as="footer"
      pt="16"
      pb="8"
      w={{ base: 300, sm: 'full' }}
      justify={'center'}
    >
      <Text fontSize={'sm'} textAlign="center">
        Desarrollado por Tomás Rodríguez - Prueba técnica La Liga @2022
      </Text>
    </Flex>
  );
};
