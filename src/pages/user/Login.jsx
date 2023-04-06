import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import * as authService from '../../services/authService';
import { setUserToken } from '../../features/auth/userAuthSlice';

const theme = createTheme();

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.userAuth);

  useEffect(() => {
    if (token) {
      navigate('/contacts');
    }
  });

  // User login form schema
  const schema = yup.object().shape({
    email: yup
      .string()
      .email('Enter valid email')
      .required('Email is required'),
    password: yup.string().min(3).required('Password is required'),
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
      const response = await authService.userLogin(data);

      if (response) {
        dispatch(setUserToken({ token: response.token, user: response.user }));
        navigate('/contacts');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container ba>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: 'white',
              boxShadow:
                '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
            }}
          >
            <Typography component="h3" variant="p">
              Welcome to Stezga
            </Typography>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              sx={{ p: 5 }}
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

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                color="secondary"
                id="password"
                autoComplete="current-password"
                error={!!errors.password}
                helperText={errors.password ? errors.password.message : ''}
                {...register('password')}
              />

              <p style={{ color: 'grey', float: 'right' }}>Forgot password?</p>

              <Button
                className="login-btn"
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  backgroundColor: 'black',
                  mt: 1,
                  mb: 2,
                  textTransform: 'capitalize',
                }}
              >
                Sign In
              </Button>
              <div
                style={{
                  width: '100%',
                  height: '20px',
                  borderBottom: '1px solid black',
                  textAlign: 'center',
                }}
              >
                <span
                  style={{
                    fontSize: '20px',
                    backgroundColor: 'white',
                    padding: '0 10px',
                  }}
                >
                  or
					{' '}
                </span>
              </div>
            </Box>
            <Box>
              <Button
                onClick={() => navigate('/otp-login')}
                className="login-btn"
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  backgroundColor: 'black',
                  mb: 2,
                  textTransform: 'capitalize',
                }}
              >
                Login With OTP
              </Button>
              <p style={{ fontSize: '12px', color: 'black' }}>
                Don't have an account?
                <Link to="/signup"> Sign Up</Link>
              </p>
            </Box>
            <Grid container>
              <Grid item></Grid>
            </Grid>
          </Box>
        </Container>
      </Container>
    </ThemeProvider>
  );
}
