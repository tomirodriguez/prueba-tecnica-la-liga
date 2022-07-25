import { Box } from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { RequireAuth } from './components/hoc';
import { LoadingScreen } from './components/ui';
import { useAuthSelector, useCheckUserSession } from './hooks';
import { ClubsPage, LoginPage } from './pages';

export const App: FC = () => {
  const { checkingSession } = useAuthSelector();
  const checkUserSession = useCheckUserSession();

  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  if (checkingSession) return <LoadingScreen />;

  return (
    <Box>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route
          path="*"
          element={
            <RequireAuth>
              <Routes>
                <Route path="clubs" element={<ClubsPage />} />
                <Route path="/" element={<Navigate to={'/clubs'} />} />
              </Routes>
            </RequireAuth>
          }
        />
      </Routes>
    </Box>
  );
};
