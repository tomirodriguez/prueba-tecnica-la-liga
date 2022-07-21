import { useAppDispatch, useAuthSelector } from '../../../store/hooks';
import { loginRequest } from '../../../store/slices/auth';
import { LoginForm } from './components';
import { Navigate } from 'react-router-dom';

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

  return (
    <LoginForm
      errorMessage={error}
      disableForm={loading || user !== null}
      onFormSubmit={onFormSubmit}
    />
  );
};
