import { Box, Button, Container, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as authService from '../../../services/authService';
import { setUserToken } from '../../../features/auth/userAuthSlice';

function OTP({ setOtpPage, companyData, personalData }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [otp, setOtp] = useState('');
  const handleChange = (e) => {
    setOtp(e.target.value);
  };
  const handleSubmit = async () => {
    try {
      if (!otp || otp.length < 4) {
        toast.error('Please enter valid otp');
      } else {
        const response = await authService.varifySignUpOtp({
          ...personalData,
          otp,
          ...companyData,
        });

        if (response.status === 'Success') {
          dispatch(
            setUserToken({ token: response.token, user: response.user })
          );
          navigate('/contacts');
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100%',
        backgroundColor: 'white',
        margin: '0',
        padding: '0',
        fontFamily: 'Montserrat,sans-serif',
      }}
    >
      <Toaster />
      <Container
        component="main"
        maxWidth="lg"
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box sx={{ height: '20%', width: '100%' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center ',
              height: '100%',
              color: '#2b3749',
            }}
          >
            <span
              style={{ fontWeight: '600', fontSize: '18px', cursor: 'pointer' }}
            >
              <ArrowBackIcon onClick={() => setOtpPage(false)} />
            </span>
            <span
              onClick={() => setOtpPage(false)}
              style={{
                fontWeight: '600',
                fontSize: '18px',
                paddingLeft: '10px',
                cursor: 'pointer',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              Back
            </span>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: '0 16px 22px rgba(0,50,125,.15)',
            width: '450px',
            height: '300px',
            justifyContend: 'center',
          }}
        >
          <Typography component="h3" variant="p">
            Welcome to STEZGA
          </Typography>
          <Typography component="h4" paddingTop="5px" variant="p">
            Company Details
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{
              mt: 1,
              width: '80%',
              fontSize: '16px',
              fontWeight: 500,
            }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="otp"
              label="OTP"
              size="small"
              autoFocus
              value={otp}
              onChange={handleChange}
            />

            <Button
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: '#2b3749 ',
                '&:hover': {
                  backgroundColor: 'black',
                  boxShadow: 'none',
                },
              }}
              onClick={handleSubmit}
            >
              Next
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default OTP;
