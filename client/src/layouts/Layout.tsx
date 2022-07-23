import { Box, VStack } from '@chakra-ui/react';
import { FC, PropsWithChildren } from 'react';
import { ResponsiveContainer } from '.';
import { NavBar } from '../components/features';

export const Layout: FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <VStack minH={'100vh'} bg={'bg'} position="relative">
      <Box as="header" w="full">
        <NavBar />
      </Box>

      <ResponsiveContainer as="main" flexGrow={1}>
        <Box w="full" mt="12">
          {children}
        </Box>
      </ResponsiveContainer>

      <Box as="footer">Footer</Box>
    </VStack>
  );
};
