import React from 'react';

import { Layout } from './HomeStyle';
import AgeGroupPriceList from '../../components/ageGroupPriceList/AgeGroupPriceList';

const Home: React.FC = () => {

  return (
    <Layout>
      <h1>首頁</h1>
      <AgeGroupPriceList onChange={(result) => console.log(result)} />
    </Layout>
  );
};
export default Home;
