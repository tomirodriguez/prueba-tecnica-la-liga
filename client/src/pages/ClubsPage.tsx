import { FC } from 'react';
import { ClubCatalog } from '../components/features';
import { Layout } from '../layouts';

export const ClubsPage: FC = () => {
  return (
    <Layout>
      <ClubCatalog />
    </Layout>
  );
};
