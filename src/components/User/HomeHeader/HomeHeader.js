import styled from '@emotion/styled';
import {
  AppBar, Box, Button, Toolbar, Typography,
} from '@mui/material';
import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

function HomeHeader() {
  const navigate = useNavigate();
  const NavBar = styled(Box)({
    display: 'flex',
    gap: 30,
  });
  const StyledToolbar = styled(Toolbar)({
    display: 'flex',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    boxShadow: '0 16px 22px rgba(0,50,125,.15)',
  });
  const MenuBox = styled(Box)({
    display: 'flex',
    gap: 30,
  });

  const menu = [
    { name: 'Product' },
    { name: 'Fetures' },
    { name: 'Pricing' },
    { name: 'Learn' },
    { name: 'Company' },
  ];

  return (
    <Box position="static" sx={{ flexGrow: 1, position: 'static' }}>
      <AppBar position="static">
        <StyledToolbar>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}
          >
            <img
              src="/images/logo2.jpg"
              alt=""
              style={{ width: '130px', height: '40px' }}
            />
          </Box>
          <MenuBox sx={{ display: { xs: 'none', md: 'flex' } }}>
            {menu.map((v) => (
              <Typography
                key={v.name}
                sx={{ cursor: 'pointer', color: 'black' }}
              >
                {v.name}
              </Typography>
            ))}
          </MenuBox>

          <MenuIcon
            sx={{ color: 'black', display: { xs: 'flex', md: 'none' } }}
          />

          <Box
            sx={{
              width: '300px',
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'space-between',
            }}
          >
            <Button
              variant="contained"
              onClick={() => navigate('/signup')}
              sx={{ width: '140px', height: '45px', fontWeight: 600 }}
            >
              Start free
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate('/login')}
              sx={{
                backgroundColor: '#008eff26',
                width: '140px',
                height: '45px',
                fontWeight: 600,
              }}
            >
              Login
            </Button>
          </Box>
        </StyledToolbar>
      </AppBar>
    </Box>
  );
}

export default HomeHeader;
