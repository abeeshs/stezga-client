import { Box, Button, Container, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import * as authService from '../../../../services/authService';
import OTP from '../../OTP/OTP';

function CompanyForm({ personalData, setPage }) {
  const [otpPage, setOtpPage] = useState(false);
  const [companyData, setCompanyData] = useState({});

  const schema = yup.object().shape({
    companyName: yup.string().required('Company Name is required'),
    role: yup.string().required('Role is required'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // form on submit function
  const onSubmit = async (data) => {
    if (data) {
      setCompanyData(data);
      const response = await authService.sendEmailOtp(personalData);

      if (response.status === 'Success') {
        setOtpPage(true);
      }
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
      {!otpPage ? (
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
                style={{
                  fontWeight: '600',
                  fontSize: '18px',
                  cursor: 'pointer',
                }}
              >
                <ArrowBackIcon onClick={() => setPage(false)} />
              </span>
              <span
                onClick={() => setPage(false)}
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
                {' '}
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
              onSubmit={handleSubmit(onSubmit)}
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
                id="companyName"
                label="Company Name"
                size="small"
                autoComplete="companyName"
                autoFocus
                error={!!errors.companyName}
                helperText={
                  errors.companyName ? errors.companyName.message : ''
                }
                {...register('companyName')}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                size="small"
                id="role"
                label="Your Role"
                autoComplete="role"
                autoFocus
                error={!!errors.role}
                helperText={errors.role ? errors.role.message : ''}
                {...register('role')}
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
                Next
              </Button>
            </Box>
          </Box>
        </Container>
      ) : (
        <OTP
          setOtpPage={setOtpPage}
          personalData={personalData}
          companyData={companyData}
        />
      )}
    </Box>
  );
}

export default CompanyForm;
