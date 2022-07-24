import { Button, ButtonProps } from '@chakra-ui/react';
import { FC } from 'react';

export const PrimaryButton: FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <Button {...props} bg="secondary.main" color="white">
      {children}
    </Button>
  );
};
