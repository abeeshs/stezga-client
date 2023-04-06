import {
  Alert,
  Box,
  Button,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  SwipeableDrawer,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import './RightSidebar.css';
import CloseIcon from '@mui/icons-material/Close';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as contactService from '../../../services/contactService';

function RightSideBar({ getAllContacts, users }) {
  console.log(users);
  // schema for create contact form
  const schema = yup.object().shape({
    firstname: yup
      .string()
      .required('First Name is required')
      .matches(/^(\S+$)/g, 'Name not in correct format'),
    lastname: yup
      .string()
      .required('Last Name is required')
      .matches(/^(\S+$)/g, 'Name not in correct format'),
    email: yup.string().email().required('Email is required'),
    jobTitle: yup.string().required('Job title is required'),
    mobile: yup
      .string()
      .required('Mobile is required')
      .matches(/^[789]\d{9}$/, 'Is not in correct format'),
    contactOwner: yup.string().required('Select the contact owner'),
    lifeCycle: yup.string(),
    leadStatus: yup.string(),
  });

  // setting schema
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [state, setState] = React.useState({ right: false });

  const [errorMessage, setErrorMessage] = useState('');

  const toggleDrawer = (anchor, open) => async (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });

    getAllContacts();
  };

  // form on submit function
  const onSubmit = async (data) => {
    try {
      const response = await contactService.createContact(data);
      if (response && response.status === 'success') {
        setState('right', false);
        getAllContacts();
        setErrorMessage('');
      } else {
        setErrorMessage(response);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 550, height: '100vh', backgroundColor: 'white !important' }}
      role="presentation"
    >
      <Box
        className="button-color"
        sx={{ width: '100%', height: '70px', position: 'sticky' }}
      >
        <Stack direction="row" justifyContent="space-between" padding="20px">
          <Typography variant="h5" sx={{ color: 'white', fontWeight: '500' }}>
            Create Contact
          </Typography>
          <CloseIcon
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
            sx={{ color: 'white', right: '0', fontSize: '30px' }}
          />
        </Stack>
      </Box>
      {errorMessage ? <Alert severity="error">{errorMessage}</Alert> : ''}
      <Box
        sx={{
          backgroundColor: 'white !important',
          height: '90%',
          overflowY: 'scroll',
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack
            spacing={1}
            justifyContent="center"
            sx={{ width: 500, paddingLeft: '15px' }}
          >
            <InputLabel className="label" htmlFor="my-input">
              Email address
            </InputLabel>
            <TextField
              sx={{ width: 500 }}
              name="email"
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ''}
            />

            <InputLabel className="label" htmlFor="my-input">
              First name
            </InputLabel>
            <TextField
              sx={{ width: 500 }}
              name="firstname"
              error={!!errors.firstname}
              helperText={errors.firstname ? errors.firstname.message : ''}
              {...register('firstname')}
            />

            <InputLabel className="label" htmlFor="my-input">
              Last name
            </InputLabel>

            <TextField
              sx={{ width: 500 }}
              name="lastname"
              error={!!errors.lastname}
              helperText={errors.lastname ? errors.lastname.message : ''}
              {...register('lastname')}
            />

            <InputLabel className="label" htmlFor="my-input">
              Contact owner
            </InputLabel>
            <Select
              sx={{ m: 1, minWidth: 280 }}
              labelId="demo-simple-select-autowidth-label"
              id="contactOwner"
              onChange={onchange}
              autoWidth
              name="contactOwner"
              error={!!errors.contactOwner}
              helperText={
                errors.contactOwner ? errors.contactOwner.message : ''
              }
              {...register('contactOwner')}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {users.map((user) => (
                <MenuItem value={user._id}>{user?.username}</MenuItem>
              ))}
            </Select>

            <InputLabel className="label" htmlFor="my-input">
              Job title
            </InputLabel>
            <TextField
              sx={{ width: 500 }}
              name="jobTitle"
              error={!!errors.jobTitle}
              helperText={errors.jobTitle ? errors.jobTitle.message : ''}
              {...register('jobTitle')}
            />
            <InputLabel className="label" htmlFor="my-input">
              Phone number
            </InputLabel>
            <TextField
              sx={{ width: 500 }}
              name="mobile"
              error={!!errors.mobile}
              helperText={errors.mobile ? errors.mobile.message : ''}
              {...register('mobile')}
            />
            <InputLabel className="label" htmlFor="my-input">
              Life cycle stage
            </InputLabel>
            <Select
              sx={{ m: 1, minWidth: 280 }}
              labelId="demo-simple-select-autowidth-label"
              id="lifeCycle"
              onChange={onchange}
              autoWidth
              name="lifeCycle"
              error={!!errors.lifeCycle}
              helperText={errors.lifeCycle ? errors.lifeCycle.message : ''}
              {...register('lifeCycle')}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="Lead">Lead</MenuItem>
              <MenuItem value="Marketing Qualified Lead">
                Marketing Qualified Lead
              </MenuItem>
              <MenuItem value="Sales Qualified Field">
                Sales Qualified Field
              </MenuItem>
              <MenuItem value="Customer">Customer</MenuItem>
            </Select>
            <InputLabel className="label" htmlFor="my-input">
              Lead Status
            </InputLabel>
            <Select
              sx={{ m: 1 }}
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              onChange={onchange}
              autoWidth
              name="leadStatus"
              error={!!errors.leadStatus}
              helperText={errors.leadStatus ? errors.leadStatus.message : ''}
              {...register('leadStatus')}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="New">New</MenuItem>
              <MenuItem value="Open Deal">Open Deal</MenuItem>
              <MenuItem value="Unqualified">Unqualified</MenuItem>
              <MenuItem value="Attempt to contact">Attempt to contact</MenuItem>
              <MenuItem value="Connected">Connected</MenuItem>
              <MenuItem value="Bad timing">Bad timing</MenuItem>
            </Select>
          </Stack>
          <Button
            type="submit"
            className="button-color"
            style={{ color: 'white', margin: '25px' }}
          >
            {' '}
            Create
          </Button>
        </form>
      </Box>
    </Box>
  );
  return (
    <>
      <Button
        sx={{ float: 'right', marginBottom: '20px' }}
        className="button-color"
        variant="contained"
        onClick={toggleDrawer('right', true)}
      >
        Create
      </Button>
      <SwipeableDrawer
        anchor="right"
        open={state['right']}
        onOpen={toggleDrawer('right', true)}
      >
        {list('right')}
      </SwipeableDrawer>
    </>
  );
}

export default RightSideBar;
