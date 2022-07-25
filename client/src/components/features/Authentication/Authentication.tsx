import { Button } from '@chakra-ui/react';
import { useLogin } from '../../../hooks';
import { useAuthSelector } from '../../../redux';
import { LoginForm } from './components';

export const Authentication = () => {
  const { error, loading, user } = useAuthSelector();
  const login = useLogin();

  if (user) return null;

  const onFormSubmit = ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    login(email, password);
  };

  const autoLogin = () => {
    login('fake.user@fake.com', '123');
  };

  return (
    <>
      <LoginForm
        errorMessage={error}
        isLoading={loading}
        onFormSubmit={onFormSubmit}
      />
      {process.env.NODE_ENV === 'development' && (
        <Button mt={5} onClick={autoLogin}>
          Auto Login
        </Button>
      )}
    </>
  );
};
