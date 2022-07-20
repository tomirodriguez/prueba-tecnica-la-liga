import { useAppDispatch } from '../../../store/hooks';
import { useAuthSelector } from '../../../store/hooks/useAuthSelector';
import { loginRequest } from '../../../store/slices/auth/authSlice';
import { LoginForm } from './components';

export const Authentication = () => {
  const { error, loading } = useAuthSelector();

  const dispatch = useAppDispatch();

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
      disableForm={loading}
      onFormSubmit={onFormSubmit}
    />
  );
};
