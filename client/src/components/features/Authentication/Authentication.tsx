import { Button } from '@chakra-ui/react';
import { useAppDispatch, useAuthSelector } from '../../../hooks';
import { loginRequest } from '../../../redux/slices/auth';
import { LoginForm } from './components';

export const Authentication = () => {
  const { error, loading, user } = useAuthSelector();
  const dispatch = useAppDispatch();

  if (user) return null;

  const onFormSubmit = ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    dispatch(loginRequest({ email, password }));
  };

  const autoLogin = () => {
    dispatch(loginRequest({ email: 'fake.user@fake.com', password: '123' }));
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
