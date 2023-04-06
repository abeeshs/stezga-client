import React, { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import {
  Box,
  Button,
  Container,
  FormControlLabel,
  InputAdornment,
  Paper,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Toolbar,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import dayjs from 'dayjs';
import Header from '../../components/User/Header/Header';
import UseTable from '../../components/Extra Components/UseTable';
import Popup from '../../components/User/Popup/Popup';
import AddUserForm from '../../components/User/Forms/AddUserForm/AddUserForm';
import * as userService from '../../services/userService';

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#f06565' : '#f06565',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => items,
  });
  const headCells = [
    { id: 'name', label: 'User Name' },
    { id: 'email', label: 'Email ID' },
    { id: 'mobile', label: 'Mobile Number' },
    { id: 'created', label: 'Created On' },
    { id: 'block', label: 'Block/Unblock' },
  ];

  const getUsersList = async () => {
    try {
      const response = await userService.viwAllCompanyUsers();
      if (response.status === 'Success') {
        setUsers(response.users);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getUsersList();
  }, []);

  const blockHandler = async (user_Id, status) => {
    try {
      const response = await userService.blockUsers(user_Id, status);
      if (response) {
        getUsersList();
      }
    } catch (err) {
      console.log(err);
    }
  };
  const { TblContainer, TblHead, TblPagination, recordAfterPagingAndSorting } =
    UseTable(users, headCells, filterFn);
  const handleSearch = (e) => {
    console.log(e);
    const target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value === '') {
          return items;
        } else {
          return items.filter((x) =>
            x.username.toLowerCase().includes(target.value)
          );
        }
      },
    });
  };

  return (
    <>
      <Header />

      <Box
        sx={{
          height: '70px',
          border: '1px solid rgb(223, 227, 235)',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'white',
        }}
      >
        <Box sx={{ padding: '55px' }}>
          <p className="page-heading">Users</p>
        </Box>
      </Box>
      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Paper elevation={4}>
          <Toolbar>
            <TextField
              fullWidth
              size="small"
              label="Search Contacts"
              onChange={handleSearch}
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            >
              Search
            </TextField>
            <Button
              onClick={() => setOpenPopup(true)}
              variant="outlined"
              sx={{ width: '150px', marginLeft: '150px' }}
            >
              + Add New
            </Button>
          </Toolbar>
          <TblContainer>
            <TblHead />
            <TableBody>
              {recordAfterPagingAndSorting().map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{item.username}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.mobile}</TableCell>
                  <TableCell>
                    {dayjs(item.createdAt).format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell>
                    {item.is_block ? (
                      <FormControlLabel
                        control={
                          <IOSSwitch
                            sx={{ m: 1 }}
                            onClick={() => blockHandler(item._id, false)}
                            defaultChecked
                          />
                        }
                        label=""
                      />
                    ) : (
                      <FormControlLabel
                        control={
                          <IOSSwitch
                            sx={{ m: 1 }}
                            onClick={() => blockHandler(item._id, true)}
                          />
                        }
                        label=""
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </TblContainer>
          <TblPagination />
        </Paper>
      </Container>
      <Popup openPopup={openPopup} setOpenPopup={setOpenPopup}>
        <AddUserForm setOpenPopup={setOpenPopup} />
      </Popup>
    </>
  );
}

export default UsersPage;
