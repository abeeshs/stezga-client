import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as contactService from '../../../../services/contactService';
import * as userService from '../../../../services/userService';

function AddContactForm() {
  const [users, setUsers] = useState([]);
  const handleGetUser = async () => {
    try {
      const userData = await userService.getAllUser();
      if (userData) {
        setUsers(userData);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    handleGetUser();
  }, []);

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
    mobile: yup
      .string()
      .required('Mobile is required')
      .matches(/^[789]\d{9}$/, 'Is not in correct format'),
    contactOwner: yup.string().required('Select the contact owner'),
    jobTitle: yup.string(),
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

  const onSubmit = async (data) => {
    try {
      await contactService.adminCreateContact(data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <form
      style={{ width: '100%', padding: '5px', display: 'flex' }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <TextField
            required
            id="outlined-basic"
            variant="outlined"
            label="First Name"
            fullWidth
            name="firstname"
            size="small"
            error={!!errors.firstname}
            helperText={errors.firstname ? errors.firstname.message : ''}
            {...register('firstname')}
          />
          <TextField
            required
            sx={{ marginTop: '20px' }}
            fullWidth
            variant="outlined"
            name="email"
            label="Email"
            size="small"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ''}
          />

          <FormControl sx={{ mt: 2.5 }} fullWidth size="small">
            <InputLabel>Contact Owner</InputLabel>

            <Select
              required
              name="contactOwner"
              label="Contact Owner"
              error={!!errors.contactOwner}
              helperText={
                errors.contactOwner ? errors.contactOwner.message : ''
              }
              {...register('contactOwner')}
            >
              {users?.map((element) => (
                <MenuItem key={element._id} value={element._id}>
                  {element?.username}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ mt: 2.5 }} fullWidth size="small">
            <InputLabel>Life Cycle Stage</InputLabel>

            <Select
              name="lifeCycle"
              labelId="lifeCycle"
              label="Life Cycle Stage"
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
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <TextField
            required
            variant="outlined"
            label="Last Name"
            fullWidth
            name="lastname"
            size="small"
            error={!!errors.lastname}
            helperText={errors.lastname ? errors.lastname.message : ''}
            {...register('lastname')}
          />
          <TextField
            required
            sx={{ marginTop: '20px' }}
            fullWidth
            variant="outlined"
            label="Mobile"
            size="small"
            name="mobile"
            error={!!errors.mobile}
            helperText={errors.mobile ? errors.mobile.message : ''}
            {...register('mobile')}
          />

          <FormControl sx={{ mt: 2.5 }} fullWidth size="small">
            <InputLabel>Lead Status</InputLabel>

            <Select
              name="leadStatus"
              labelId="leadStatus"
              label="Lead Status"
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
          </FormControl>
          <TextField
            sx={{ marginTop: '20px' }}
            fullWidth
            name="jobTitle"
            variant="outlined"
            label="Job Title"
            size="small"
            error={!!errors.jobTitle}
            helperText={errors.jobTitle ? errors.jobTitle.message : ''}
            {...register('jobTitle')}
          />
        </Grid>
        <Box
          sx={{
            width: '100%',
            m: 1,
            p: 1,
            height: '40px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Button
            className="meeting-btn"
            type="submit"
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        </Box>
      </Grid>
    </form>
  );
}

export default AddContactForm;
