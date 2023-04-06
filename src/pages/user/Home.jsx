import { Box } from '@mui/material';
import React from 'react';
import Footer from '../../components/User/Footer/Footer';
import HomeHeader from '../../components/User/HomeHeader/HomeHeader';
import HomeMid from '../../components/User/HomeMid/HomeMid';
import HomeStart from '../../components/User/HomeStart/HomeStart';

function Home() {
  return (
    <Box>
      <HomeHeader />
      <HomeStart />
      <HomeMid />
      <Footer />
    </Box>
  );
}

export default Home;
