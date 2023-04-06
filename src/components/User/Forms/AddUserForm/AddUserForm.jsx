import {
  Alert,
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import * as userService from '../../../../services/userService';

function AddUserForm({ setOpenPopup }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  function isValidEmail(emailId) {
    return /\S+@\S+\.\S+/.test(emailId);
  }
  const handleChange = (e) => {
    if (!isValidEmail(e.target.value)) {
      setError('Email is invalid');
    } else {
      setError(null);
    }
    setEmail(e.target.value);
  };
  const handleSubmit = async () => {
    try {
      if (!email) {
        setError('Please enter valid email');
      } else {
        const response = await userService.inviteNewUser(email);
        if (response.status === 'Success') {
          setOpenPopup(false);
          toast.success('Invitation sent successfully');
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Box
      sx={{
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
            Add New User
          </Typography>
          <Typography component="h4" paddingTop="5px" variant="p">
            Enter email address
          </Typography>
          {error && (
            <span style={{ fontSize: '14px', color: 'red' }}>{error}</span>
          )}
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
              id="email"
              label="Email"
              size="small"
              autoFocus
              value={email}
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
              Send
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default AddUserForm;
