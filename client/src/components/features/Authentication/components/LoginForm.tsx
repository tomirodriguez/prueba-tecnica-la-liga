import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Text,
} from '@chakra-ui/react';
import { ChangeEvent, FC, SyntheticEvent, useState } from 'react';

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

  return (
    <form onSubmit={handleFormSubmit}>
      <Flex
        direction={'column'}
        w={300}
        shadow={'md'}
        rounded={'md'}
        background={'white'}
        padding={30}
        border={'1px'}
        borderColor={errorMessage ? 'red' : 'white'}
      >
        <FormControl>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input type="email" id="email" onChange={handleEmailChange} />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="password" mt={5}>
            Password
          </FormLabel>
          <Input
            type="password"
            id="password"
            onChange={handlePasswordChange}
          />
          {errorMessage ? (
            <Text align={'right'} fontSize={'xs'} color={'red'}>
              Usuario invalido.
            </Text>
          ) : (
            <FormHelperText textAlign={'right'} fontSize={'xs'}>
              Nunca compartas tus contraseñas
            </FormHelperText>
          )}
        </FormControl>

        <Button mt={5} type="submit" isLoading={isLoading}>
          Entrar
        </Button>
      </Flex>
    </form>
  );
};
