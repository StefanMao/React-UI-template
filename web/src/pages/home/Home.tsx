import React from 'react';
import { Grid } from '@mui/material';

import AgeGroupPriceList from '../../components/ageGroupPriceList/AgeGroupPriceList';

const Home: React.FC = () => {
  return (
    <div>
      <Grid item>
        <h1>首頁</h1>
        <AgeGroupPriceList />
      </Grid>
    </div>
  );
};
export default Home;
