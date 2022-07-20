import { FC } from 'react';
import { LoginView } from './views/Login';

type Props = {};

export const App: FC<Props> = () => {
  return (
    <div>
      <LoginView />
    </div>
  );
};
