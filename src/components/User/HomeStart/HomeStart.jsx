import './HomeStart.css';
import { Box, Button, Container, Typography } from '@mui/material';
import React from 'react';

function HomeStart() {
  return (
    <Box
      sx={{
        display: 'flex',
        backgroundColor: 'white',
        width: '100%',
        height: '80vh',
        '& .MuiPaper-root': {},
      }}
    >
      <Container
        maxWidth="lg"
        sx={{ display: 'flex', justifyContent: 'center', paddingTop: '80px' }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',

            height: '66vh',
            width: '100%',
          }}
        >
          <Box sx={{ width: { lg: '45%', xl: '45%' }, height: '100%' }}>
            <Typography
              className="main-title"
              sx={{
                fontFamily: 'Montserrat,sans-serif',
                display: 'block',
                margin: '0 auto',
                width: { sm: '100%', xs: '100%' },
                color: 'black',
                fontWeight: 800,
                lineHeight: '120%',
                fontSize: ' 35px',
                paddingBottom: '25px',
              }}
            >
              CRM for sales
              <br />
              and marketing teams
            </Typography>
            <Typography
              sx={{ fontSize: '21px', paddingBottom: '30px', fontWeight: 800 }}
              variant="h5"
            >
              Integrated with gmail and linkedIn
            </Typography>
            <Typography
              variant="p"
              sx={{
                fontSize: '18px',
                fontFamily: 'Montserrat,sans-serif',
                letterSpacing: '0.1rem',
                lineHeight: '1.5rem',
              }}
            >
              Stezga CRM is a sales automation tool that helps you manage leads,
              nurture customer relations, monitor sales progress, and close more
              deals.
            </Typography>
            <p style={{ paddingTop: '26px' }}>
              <Button
                sx={{
                  height: '55px',
                  width: '200px',
                  fontWeight: '600',
                  fontSize: '16px',
                }}
                variant="contained"
              >
                Start free
              </Button>
            </p>
            <p>
              <img
                src="https://nethunt.com/static/images/mainPage/rating.svg"
                alt=""
              />
            </p>
          </Box>
          <Box
            sx={{
              display: {
                md: 'flex',
                lg: 'flex',
                xs: 'none',
                sm: 'none',
              },
              width: '45%',
              height: '100%',
              objectFit: 'contain',
            }}
          >
            <img
              style={{ objectFit: 'contain' }}
              src="/images/home.png"
              alt=""
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default HomeStart;
