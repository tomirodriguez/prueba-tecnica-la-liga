import { FC, PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthSelector } from '../../redux';

export const RequireAuth: FC<PropsWithChildren<{}>> = ({ children }) => {
  const { user } = useAuthSelector();

  if (!user) return <Navigate to="/login" />;

  return <>{children}</>;
};
