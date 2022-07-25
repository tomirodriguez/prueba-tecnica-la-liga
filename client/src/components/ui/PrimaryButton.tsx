import { Button, ButtonProps, useColorMode } from '@chakra-ui/react';
import { FC } from 'react';

export const PrimaryButton: FC<ButtonProps> = ({ children, ...props }) => {
  const { colorMode } = useColorMode();
  return (
    <Button
      bg={`${colorMode}.secondary.main`}
      color="white"
      _hover={{ bg: `${colorMode}.secondary.dark` }}
      _focus={{ outline: 'none' }}
      {...props}
    >
      {children}
    </Button>
  );
};
