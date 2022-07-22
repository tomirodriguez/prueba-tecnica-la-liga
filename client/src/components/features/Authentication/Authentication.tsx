import { useAppDispatch, useAuthSelector } from '../../../store/hooks';
import { loginRequest } from '../../../store/slices/auth';
import { LoginForm } from './components';
import { Navigate } from 'react-router-dom';
import { Button } from '@chakra-ui/react';

export const Authentication = () => {
  const { error, loading, user } = useAuthSelector();
  const dispatch = useAppDispatch();

  if (user) return <Navigate to={'/clubs'} replace />;

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
        disableForm={loading || user !== null}
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
