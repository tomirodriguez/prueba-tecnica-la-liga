import { Box, VStack } from '@chakra-ui/react';
import { FC, PropsWithChildren } from 'react';
import { ResponsiveContainer } from '.';
import { NavBar } from '../components/features';

export const Layout: FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <VStack h={'100vh'} bg={'bg'} position="relative">
      <Box as="header" w="full">
        <NavBar />
      </Box>

      <ResponsiveContainer as="main" flexGrow={1}>
        <Box w="full">{children}</Box>
      </ResponsiveContainer>

      <Box as="footer">Footer</Box>
    </VStack>
  );
};
