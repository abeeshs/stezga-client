import { Box, Button, Container, CssBaseline, TextField } from '@mui/material';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as authService from '../../services/authService';
import { setUserEmail } from '../../features/auth/otpLoginSlice';

function OtpEmail() {
  const navigate = useNavigate();

  const theme = createTheme();
  const dispatch = useDispatch();
  // otp login form schema
  const schema = yup.object().shape({
    email: yup
      .string()
      .email('Enter valid email')
      .required('Email is required'),
  });
  // setting schema
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  // form on submit function
  const onSubmit = async (data) => {
    const response = await authService.userOtpLogin(data);
    if (response) {
      dispatch(setUserEmail(data.email));
      navigate('/verify-otp');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container ba>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              display: 'flex',
              marginTop: '25vh',
              justifyContent: 'center',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: 'white',
              boxShadow:
                '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
            }}
          >
            <p>
              {' '}
              <b> OTP Varification</b>
            </p>
            <div
              style={{
                width: '300px',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                fontSize: '14px',
              }}
            >
              <p>
                We will send you an
                <b> One Time Password</b>
                on this email address
              </p>
            </div>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              sx={{ height: '200px' }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="emaili"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                color="secondary"
                error={!!errors.email}
                helperText={errors.email ? errors.email.message : ''}
                {...register('email')}
              />

              <Button
                sx={{ mt: 3 }}
                className="login-btn"
                type="submit"
                fullWidth
                variant="contained"
              >
                Send
              </Button>
              <Box sx={{ textAlign: 'center', cursor: 'pointer' }}>
                <p onClick={() => navigate('/')}>Cancel</p>
              </Box>
            </Box>
          </Box>
        </Container>
      </Container>
    </ThemeProvider>
  );
}

export default OtpEmail;
