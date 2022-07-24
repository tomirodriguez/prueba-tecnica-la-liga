import { Box, Text } from '@chakra-ui/react';
import { FC } from 'react';

export const NoClubsFound: FC = () => {
  return (
    <Box mx="auto" maxW={300} my={8}>
      <Text fontSize={'lg'} textAlign="center">
        No se encontraron resultados para la busqueda que desea realizar.
        Intente de nuevo.
      </Text>
    </Box>
  );
};
