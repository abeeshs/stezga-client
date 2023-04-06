import { Button, Container, styled, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

function HomeMid() {
  const StyledButton = styled(Button)({
    borderRadius: '16px',
    backgroundColor: 'white',
    height: '66px',
    width: '270px',
    color: 'black',
    fontSize: '16px',
    fontFamily: ' Montserrat,sans-serif',
    border: '#fff',
    boxShadow: 'border: 2px solid #008eff',
    '&:hover': {
      backgroundColor: 'white',
      boxShadow: '0 16px 22px rgba(0,50,125,.15)',
    },
  });
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        height: '80vh',
        background: 'linear-gradient(94deg,#e6f4ff 18%,#fff6fa 100%)',
      }}
    >
      <Container
        maxWidth="lg"
        sx={{ display: 'flex', justifyContent: 'center', paddingTop: '80px' }}
      >
        <Box sx={{ width: '100%', height: '100%' }}>
          <Typography
            variant="h4"
            align="center"
            sx={{
              lineHeight: '1.7',
              color: 'black',
              fontFamily: 'Montserrat,sans-serif',
              fontWeight: '600',
            }}
          >
            Organize your data
          </Typography>
          <Typography
            align="center"
            sx={{ color: '#3f4757', fontSize: '18px' }}
          >
            Stezga automatically structures and streamlines business data
            <br />
            effectively and productively.
          </Typography>
          <Box
            sx={{
              width: '100%',
              height: '30%',
              marginTop: '30px',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <StyledButton variant="contained">
              <img
                src="https://nethunt.com/static/images/mainPage/organize/icon-1.svg"
                alt=""
              />
              <span>Sample</span>
            </StyledButton>
            <StyledButton variant="contained">
              <img
                src="https://nethunt.com/static/images/mainPage/organize/icon-2.svg"
                alt=""
              />
              <span>Sample</span>
            </StyledButton>
            <StyledButton variant="contained">
              <img
                src="https://nethunt.com/static/images/mainPage/organize/icon-3.svg"
                alt=""
              />
              <span>Sample</span>
            </StyledButton>
            <StyledButton variant="contained">
              <img
                src="https://nethunt.com/static/images/mainPage/organize/icon-4.svg"
                alt=""
              />
              <span>Sample</span>
            </StyledButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default HomeMid;
