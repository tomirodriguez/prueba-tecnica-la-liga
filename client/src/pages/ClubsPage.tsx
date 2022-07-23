import { FC } from 'react';
import { useClubsSelector } from '../hooks';
import { Layout } from '../layouts';

export const ClubsPage: FC = () => {
  const { clubs, total } = useClubsSelector();
  console.log({ clubs, total });
  return <Layout>main</Layout>;
};
