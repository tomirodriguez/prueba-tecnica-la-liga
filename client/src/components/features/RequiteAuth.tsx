import { FC, PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthSelector } from '../../hooks';

export const RequireAuth: FC<PropsWithChildren<{}>> = ({ children }) => {
  const { user } = useAuthSelector();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
