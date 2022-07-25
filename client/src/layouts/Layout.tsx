import { Box, VStack } from '@chakra-ui/react';
import { FC, PropsWithChildren } from 'react';
import { ResponsiveContainer } from '.';
import { NavBar } from '../components/features';

import { Footer } from '../components/ui';

export const Layout: FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <VStack minH={'100vh'} position="relative">
      <Box as="header" w="full">
        <NavBar />
      </Box>

      <ResponsiveContainer as="main" flexGrow={1}>
        <Box w="full" mt={{ base: 5, md: 8, xl: 12 }}>
          {children}
        </Box>
      </ResponsiveContainer>

      <Footer />
    </VStack>
  );
};
