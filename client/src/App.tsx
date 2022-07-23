import { Box } from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { RequireAuth } from './components/features/RequiteAuth';
import { ClubsPage } from './pages/ClubsPage';
import { LoginPage } from './pages/LoginPage';
import { useAuthSelector } from './hooks/useAuthSelector';
import { useAppDispatch } from './hooks/useAppDispatch';
import { checkUserSession } from './store/slices/auth';
import { LoadingScreen } from './components/ui/LoadingScreen';

export const App: FC = () => {
  const { checkingSession } = useAuthSelector();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]);

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
