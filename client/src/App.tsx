import { FC } from 'react';
import { LoginPage } from './pages/LoginPage';

type Props = {};

export const App: FC<Props> = () => {
  return (
    <div>
      <LoginPage />
    </div>
  );
};
