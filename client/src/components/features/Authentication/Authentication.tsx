import { useAppDispatch } from '../../../store/hooks';
import { useAuthSelector } from '../../../store/hooks/useAuthSelector';
import { loginRequest } from '../../../store/slices/auth';
import { LoginForm } from './components';

export const Authentication = () => {
  const { error, loading, user } = useAuthSelector();

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
      disableForm={loading || user !== null}
      onFormSubmit={onFormSubmit}
    />
  );
};
