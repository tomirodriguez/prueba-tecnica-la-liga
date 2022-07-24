import { Button, ButtonProps } from '@chakra-ui/react';
import { FC } from 'react';

export const PrimaryButton: FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <Button
      {...props}
      bg="secondary.main"
      color="white"
      _hover={{ bg: 'secondary.dark' }}
      _focus={{ outline: 'none' }}
    >
      {children}
    </Button>
  );
};
