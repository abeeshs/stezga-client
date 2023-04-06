import { Box, Container, styled } from '@mui/material';
import React from 'react';

function Footer() {
  const ListBox = styled(Box)({
    lineHeight: '40px',
    fontSize: '14px',
    fontFamily: ' Montserrat,sans-serif',
    color: '#141f33',
    textAlign: 'center',
  });
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        height: '60vh',
        background: '#f3f6fa',
      }}
    >
      <Container
        maxWidth="lg"
        sx={{ display: 'flex', justifyContent: 'center' }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            height: '100%',
            paddingTop: '50px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                fontSize: '18px',
                fontFamily: ' Montserrat,sans-serif',
                fontWeight: '600',
                letterSpacing: 0.6,
              }}
            >
              Product
            </Box>
            <Box>
              <ListBox>Overview</ListBox>
              <ListBox>Call Coaching</ListBox>
              <ListBox>Pipeline View</ListBox>
              <ListBox>CRM Integrations</ListBox>
              <ListBox>Sales Reporting</ListBox>
              <ListBox>SMS</ListBox>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                fontSize: '18px',
                fontFamily: ' Montserrat,sans-serif',
                fontWeight: '600',
                letterSpacing: 0.6,
              }}
            >
              Services
            </Box>
            <Box>
              <ListBox>Pricing</ListBox>
              <ListBox>Stezga vs Other CRMs</ListBox>
              <ListBox>Stezga for Startups</ListBox>
              <ListBox>User Reviews</ListBox>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                fontSize: '18px',
                fontFamily: ' Montserrat,sans-serif',
                fontWeight: '600',
                letterSpacing: 0.6,
              }}
            >
              Resources
            </Box>
            <Box>
              <ListBox>Sales Blog</ListBox>
              <ListBox>Free Sales Resources</ListBox>
              <ListBox>Webinars</ListBox>
              <ListBox>On-Demand Demo</ListBox>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                fontSize: '18px',
                fontFamily: ' Montserrat,sans-serif',
                fontWeight: '600',
                letterSpacing: 0.6,
              }}
            >
              Company
            </Box>
            <Box>
              <ListBox>About</ListBox>
              <ListBox>Careers</ListBox>
              <ListBox>Close Partner Program</ListBox>
              <ListBox>Brand Guidelines</ListBox>
              <ListBox>Terms</ListBox>
              <ListBox>Privacy</ListBox>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                fontSize: '18px',
                fontFamily: ' Montserrat,sans-serif',
                fontWeight: '600',
                letterSpacing: 0.6,
              }}
            >
              Contact
            </Box>
            <Box>
              <ListBox>Help Center</ListBox>
              <ListBox>API Documentation</ListBox>
              <ListBox>Download Desktop App</ListBox>
              <ListBox>Product Updates</ListBox>
              <ListBox>System Status</ListBox>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
