import React from 'react';
import { Box } from '@mui/material';

import { Layout, Description } from './HomeStyle';

import AgeGroupPriceList from '../../components/ageGroupPriceList/AgeGroupPriceList';

const Home: React.FC = () => {
  return (
    <Layout>
      <Box p={2}>
        <Description>1. 使用 React 和 TypeScript 構建的專案。</Description>
        <Description>2. 使用 UI相關套件 Material UI 和 React Hook Form</Description>
        <Description>3. 使用 `npm run start` 啟動服務。</Description>
      </Box>
        <AgeGroupPriceList onChange={(result) => console.log(result)} />
    </Layout>
  );
};
export default Home;
