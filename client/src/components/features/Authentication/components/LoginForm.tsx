import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { ChangeEvent, FC, SyntheticEvent, useState } from 'react';
import { PrimaryButton } from '../../../ui';

type Props = {
  errorMessage: string;
  isLoading: boolean;

  onFormSubmit: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => void;
};

export const LoginForm: FC<Props> = ({
  onFormSubmit,
  errorMessage,
  isLoading,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleFormSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    onFormSubmit({ email, password });
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const hasError = !!errorMessage;

  return (
    <form onSubmit={handleFormSubmit}>
      <Flex
        direction={'column'}
        w={300}
        shadow={'md'}
        rounded={'md'}
        background={'bg.card'}
        padding={30}
        border={'1px'}
        borderColor={errorMessage ? 'red' : 'bg.card'}
      >
        <FormControl>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input type="email" id="email" onChange={handleEmailChange} />
        </FormControl>

        <FormControl isInvalid={hasError}>
          <FormLabel htmlFor="password" mt={5}>
            Password
          </FormLabel>
          <Input
            aria-errormessage="error-message"
            type="password"
            id="password"
            onChange={handlePasswordChange}
          />
          {hasError ? (
            // Chakra no esta manejando la accesibilidad con mensajes de error. Con esto se soluciona
            <FormErrorMessage id="error-message">
              Usuario invalido.
            </FormErrorMessage>
          ) : (
            <FormHelperText textAlign={'right'} fontSize={'xs'}>
              Nunca compartas tus contraseñas
            </FormHelperText>
          )}
        </FormControl>

        <PrimaryButton mt={5} type="submit" isLoading={isLoading}>
          Entrar
        </PrimaryButton>
      </Flex>
    </form>
  );
};
