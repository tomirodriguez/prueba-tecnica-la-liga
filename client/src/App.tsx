import { Box, useColorMode } from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { RequireAuth } from './components/hoc';
import { LoadingScreen } from './components/ui';
import { useCheckUserSession } from './hooks';
import { ClubsPage, LoginPage } from './pages';
import { useAuthSelector } from './redux';

export const App: FC = () => {
  const { checkingSession } = useAuthSelector();
  const checkUserSession = useCheckUserSession();
  const { colorMode } = useColorMode();

  useEffect(() => {
    checkUserSession();
    document.title = 'LaLiga App - Prueba técnica';
  }, [checkUserSession]);

  if (checkingSession) return <LoadingScreen />;

  return (
    <Box bg={`${colorMode}.bg.main`}>
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
