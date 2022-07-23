import { Box } from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { RequireAuth } from './components/features/RequiteAuth';
import { useAppDispatch, useAuthSelector } from './hooks';
import { ClubsPage } from './pages/ClubsPage';
import { LoginPage } from './pages/LoginPage';
import { checkUserSession } from './store/slices/auth';

export const App: FC = () => {
  const { checkingSession } = useAuthSelector();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]);

  if (checkingSession) return <Box w={'full'} h={'100vh'} bg={'black'} />;

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
