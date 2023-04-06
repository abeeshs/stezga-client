import React from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  Button,
  Box,
  Container,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as userService from '../../services/userService';
import { setUserToken } from '../../features/auth/userAuthSlice';

const theme = createTheme();
function InviteLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const schema = yup.object().shape({
    username: yup.string().required('Username is required'),
    email: yup.string().email().required('Email is required'),
    companyId: yup.string().required('Company ID is required'),
    mobile: yup
      .string()
      .required('Mobile is required')
      .matches(/^[789]\d{9}$/, 'Is not in correct format'),
    password: yup
      .string()
      .min(3, 'Password must be at least 3 characters')
      .required('Password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], "Password Didn't Match")
      .required('Confirm Password is required'),
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
    try {
      if (data) {
        const response = await userService.allowNewUserService(data);
        console.log(response);
        if (response?.status === 'Success') {
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
    <ThemeProvider theme={theme}>
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
        <Container
          component="main"
          maxWidth="lg"
          sx={{
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              boxShadow: '0 16px 22px rgba(0,50,125,.15)',
              width: '450px',
            }}
          >
            <Typography component="h3" variant="p">
              Welcome to STEZGA
            </Typography>
            <Typography component="h4" paddingTop="5px" variant="p">
              Sign Up
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              sx={{ mt: 1, width: '80%', fontSize: '16px', fontWeight: 500 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                type="text"
                size="small"
                id="companyid"
                label="Company ID"
                autoComplete="companyId"
                error={!!errors.companyId}
                helperText={errors.companyId ? errors.companyId.message : ''}
                {...register('companyId')}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="User Name"
                size="small"
                autoComplete="username"
                error={!!errors.username}
                helperText={errors.username ? errors.username.message : ''}
                {...register('username')}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                size="small"
                id="email"
                label="Email Address"
                autoComplete="email"
                error={!!errors.email}
                helperText={errors.email ? errors.email.message : ''}
                {...register('email')}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                type="number"
                size="small"
                id="mobilenum"
                label="Mobile"
                autoComplete="mobile"
                error={!!errors.mobile}
                helperText={errors.mobile ? errors.mobile.message : ''}
                {...register('mobile')}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                size="small"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                error={!!errors.password}
                helperText={errors.password ? errors.password.message : ''}
                {...register('password')}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                size="small"
                label="Confirm Password"
                type="password"
                id="confirm-password"
                autoComplete="confirm-password"
                error={!!errors.confirmPassword}
                helperText={
                  errors.confirmPassword ? errors.confirmPassword.message : ''
                }
                {...register('confirmPassword')}
              />

              <Button
                type="submit"
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
              >
                Sign Up
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default InviteLogin;
