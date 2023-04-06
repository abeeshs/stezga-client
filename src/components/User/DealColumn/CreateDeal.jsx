import {
  Box,
  Button,
  Divider,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  SwipeableDrawer,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import './CreateDeal.css';
import CloseIcon from '@mui/icons-material/Close';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector } from 'react-redux';
import Alert from '@mui/material/Alert';
import * as contactService from '../../../services/contactService';
import * as userService from '../../../services/userService';
import * as dealService from '../../../services/dealService';

function CreateDeal({ getAllDeals }) {
  // schema for create contact form
  const schema = yup.object().shape({
    dealName: yup.string().required('Deal Name is required'),
    dealStage: yup.string().required('Pipeline is required'),
    closeDate: yup.string().required('Close Date is required'),
    amount: yup
      .number()
      .typeError('Amount must be a number')
      .required('Amount is required')
      .test(
        'Is positive?',
        'The number must be greater than 0',
        (value) => value > 0
      ),
    deal_owner: yup.string(),
    priority: yup.string(),
    contact: yup.string(),
  });

  // setting schema
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [state, setState] = useState({ right: false });
  const [users, setUsers] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [error, setErrors] = useState('');

  const { token } = useSelector((state) => state.userAuth);
  const toggleDrawer = (anchor, open) => async (event) => {
    if (
      event
      && event.type === 'keydown'
      && (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const getAllUsers = async () => {
    const userlist = await userService.viwAllusers(token);
    setUsers(userlist.users);
  };
  const getAllContacts = async () => {
    const response = await contactService.getAllContact();
    if (response) {
      setContacts(response);
    }
  };
  useEffect(() => {
    getAllUsers();
    getAllContacts();
  }, []);

  // form on submit function
  const onSubmit = async (data) => {
    try {
      const response = await dealService.createDeal(data);

      if (response.status === 'success') {
        setState('right', false);
        getAllDeals();
        setErrors('');
      } else {
        setErrors(response.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onError = async (err) => {
    console.log(err);
  };

  const list = (anchor) => (
    <Box sx={{ width: 550 }} role="presentation">
      <Box
        className=""
        sx={{
          backgroundColor: '#00a4bd',
          width: '100%',
          height: '70px',
          position: 'sticky',
        }}
      >
        <Stack direction="row" justifyContent="space-between" padding="20px">
          <Typography variant="h5" sx={{ color: 'white', fontWeight: '500' }}>
            Create Deals
          </Typography>
          <CloseIcon
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
            sx={{ color: 'white', right: '0', fontSize: '30px' }}
          />
        </Stack>
      </Box>
      <Box
        component="form"
        noValidate
        sx={{ backgroundColor: 'white' }}
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        {error ? <Alert severity="error">{error}</Alert> : ''}

        <Stack
          spacing={1}
          justifyContent="center"
          sx={{ width: 500, paddingLeft: '15px' }}
        >
          <InputLabel className="label" htmlFor="my-input">
            Deal Name *
          </InputLabel>
          <TextField
            type="text"
            name="dealName"
            id="dealName"
            sx={{ width: 500 }}
            {...register('dealName')}
            error={!!errors.dealName}
            helperText={errors.dealName ? errors.dealName.message : ''}
          />

          <InputLabel className="label" htmlFor="my-input">
            Deal Stage *
          </InputLabel>
          <Select
            sx={{ m: 1, minWidth: 280 }}
            labelId="demo-simple-select-autowidth-label"
            id="dealStage"
            name="dealStage"
            onChange={onchange}
            autoWidth
            error={!!errors.dealStage}
            helperText={errors.dealStage ? errors.dealStage.message : ''}
            {...register('dealStage')}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={'APPOINTMENT SCHEDULED'}>
              Appointment Scheduled
            </MenuItem>
            <MenuItem value={'QUALIFIED TO BUY'}>Qualified to Buy</MenuItem>
            <MenuItem value={'PRESENTATION SHEDULED'}>
              Presentation Scheduled
            </MenuItem>
            <MenuItem value={'DECISION MAKER BOUGHT-IN'}>
              Decision Maker Bought In
            </MenuItem>
            <MenuItem value={'CONTRACT SENT'}>Contract Send</MenuItem>
            <MenuItem value={'CLOSED WON'}>Closed Won</MenuItem>
            <MenuItem value={'CLOSED LOST'}>Closed Lost</MenuItem>
          </Select>

          <InputLabel className="label" htmlFor="my-input">
            Amount *
          </InputLabel>
          <TextField
            sx={{ width: 500 }}
            type="text"
            name="amount"
            error={!!errors.amount}
            helperText={errors.amount ? errors.amount.message : ''}
            {...register('amount')}
          />

          <InputLabel className="label" htmlFor="my-input">
            Close Date
          </InputLabel>
          <TextField
            id="outlined-basic"
            className="outlined-basic"
            variant="outlined"
            fullWidth
            type="date"
            name="closeDate"
            error={!!errors.closeDate}
            helperText={errors.closeDate ? errors.closeDate.message : ''}
            {...register('closeDate')}
          />
          <InputLabel className="label" htmlFor="my-input">
            Deal Owner
          </InputLabel>
          <Select
            sx={{ m: 1, minWidth: 280 }}
            labelId="demo-simple-select-autowidth-label"
            id="dealOwner"
            onChange={onchange}
            autoWidth
            name="dealOwner"
            error={!!errors.dealOwner}
            helperText={errors.dealOwner ? errors.dealOwner.message : ''}
            {...register('dealOwner')}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>

            {users?.map((user) => (
              <MenuItem key={user._id} value={user._id}>
                {user?.username}
              </MenuItem>
            ))}
          </Select>

          <InputLabel className="label" htmlFor="my-input">
            Priority
          </InputLabel>
          <Select
            sx={{ m: 1, minWidth: 280 }}
            labelId="demo-simple-select-autowidth-label"
            id="priority"
            onChange={onchange}
            autoWidth
            name="priority"
            error={!!errors.priority}
            helperText={errors.priority ? errors.priority.message : ''}
            {...register('priority')}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={'Low'}>Low</MenuItem>
            <MenuItem value={'Medium'}>Medium</MenuItem>
            <MenuItem value={'High'}>High</MenuItem>
          </Select>
          <InputLabel className="label" htmlFor="my-input">
            Contact
          </InputLabel>
          <Select
            sx={{ m: 1 }}
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            onChange={onchange}
            autoWidth
            name="contact"
            error={!!errors.contact}
            helperText={errors.contact ? errors.contact.message : ''}
            {...register('contact')}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {contacts.map((item) => (
              <MenuItem key={item._id} value={item._id}>
                {' '}
                {item.firstname}
              </MenuItem>
            ))}
          </Select>
        </Stack>
        <Button
          type="submit"
          className="button-color"
          style={{ color: 'white', margin: '25px' }}
        >
          Create
        </Button>
        {/* </form> */}
      </Box>
      <Divider />
    </Box>
  );
  const boxSX = {
    backgroundColor: '#00a4bd',
    float: 'right',
    marginBottom: '20px',
    '&:hover': {
      backgroundColor: '#00a4bd',
    },
  };

  return (
    <>
      <Button
        sx={boxSX}
        className="deal-btn"
        variant="contained"
        onClick={toggleDrawer('right', true)}
      >
        Create Deal
      </Button>

      <SwipeableDrawer
        anchor={'right'}
        open={state['right']}
        onOpen={toggleDrawer('right', true)}
      >
        {list('right')}
      </SwipeableDrawer>
    </>
  );
}

export default CreateDeal;
