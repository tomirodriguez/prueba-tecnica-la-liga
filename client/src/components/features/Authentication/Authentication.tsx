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

  return (
    <LoginForm
      errorMessage={error}
      isLoading={loading}
      onFormSubmit={onFormSubmit}
    />
  );
};
