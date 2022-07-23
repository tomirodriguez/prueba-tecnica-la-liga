import { Flex, Text } from '@chakra-ui/react';
import { FC } from 'react';

export const Footer: FC = () => {
  return (
    <Flex as="footer" pt="16" pb="8" w="full" justify={'center'}>
      <Text fontSize={'sm'}>
        Desarrollado por Tomás Rodríguez - Prueba técnica La Liga @2022
      </Text>
    </Flex>
  );
};
