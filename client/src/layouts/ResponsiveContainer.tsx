import { Container, ContainerProps } from '@chakra-ui/react';
import { FC, PropsWithChildren } from 'react';

export const ResponsiveContainer: FC<PropsWithChildren<ContainerProps>> = ({
  children,
  ...props
}) => {
  return (
    <Container
      maxW={{ base: '100%', md: 'container.md', xl: 'container.xl' }}
      px={{ base: '16px', md: '32px' }}
      {...props}
    >
      {children}
    </Container>
  );
};
