import { FC } from 'react';
import { ClubsCatalog } from '../components/features/ClubsCatalog';
import { Layout } from '../layouts';

export const ClubsPage: FC = () => {
  return (
    <Layout>
      <ClubsCatalog />
    </Layout>
  );
};
