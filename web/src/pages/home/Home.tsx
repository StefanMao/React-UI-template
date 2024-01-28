import React from 'react';
import { Grid } from '@mui/material';

import { Layout } from './HomeStyle';
import AgeGroupPriceList from '../../components/ageGroupPriceList/AgeGroupPriceList';

const Home: React.FC = () => {
  return (
    <Layout>
      <h1>首頁</h1>
      <AgeGroupPriceList />
    </Layout>
  );
};
export default Home;
