import { Box, Button } from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import { LoginPage } from './pages/LoginPage';
import { useAuthSelector } from './store/hooks';
import { useAppDispatch } from './store/hooks/useAppDispatch';
import { checkUserSession, logout } from './store/slices/auth';
import { Routes, Route, Navigate } from 'react-router-dom';
import { RequireAuth } from './components/features/RequiteAuth';

export const App: FC = () => {
  const { checkingSession } = useAuthSelector();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]);

  if (checkingSession) return <Box w={'full'} h={'100vh'} bg={'black'} />;

  return (
    <Box>
      <Button onClick={() => dispatch(logout())}>Logout</Button>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route
          path="*"
          element={
            <RequireAuth>
              <Routes>
                <Route
                  path="clubs"
                  element={<Box w={'full'} h={'100vh'} bg={'violet'} />}
                />
                <Route path="/" element={<Navigate to={'/clubs'} />} />
              </Routes>
            </RequireAuth>
          }
        />
      </Routes>
    </Box>
  );
};
