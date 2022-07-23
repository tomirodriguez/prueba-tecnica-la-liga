import { FC, useEffect } from 'react';
import { ClubList } from '../components/ui/ClubList';
import { useClubsSelector } from '../hooks';
import { Layout } from '../layouts';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { clubsRequest } from '../store/slices/clubs';

export const ClubsPage: FC = () => {
  const { clubs, loading } = useClubsSelector();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clubsRequest({ limit: 6, nameFilter: '', offset: 0 }));
  }, [dispatch]);

  if (loading) return <div>LOADING SCREEN</div>;

  return (
    <Layout>
      <ClubList clubs={clubs} />
    </Layout>
  );
};
