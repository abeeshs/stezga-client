import * as React from 'react';
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Button,
  FormControlLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { Box } from '@mui/system';
import DeleteModal from '../../Extra Components/DeleteModal';
import * as userService from '../../../services/userService';

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

export default function Usertable() {
  const rows = [];
  const [users, setUsers] = useState([]);
  const [blockUser, setBlockUser] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState('');
  users.map((item, index) => {
    item.id = index + 1;
    rows.push(item);
  });

  const getUserData = async () => {
    const userData = await userService.getAllUser();
    if (userData) {
      setUsers(userData);
    }
  };
  const { token } = useSelector((state) => state.adminAuth);
  const blockHandler = async (user_Id, status) => {
    try {
      setBlockUser(user_Id);
      const response = await userService.blockUsers(user_Id, status);
      if (response) {
        getUserData();
      }
    } catch (err) {
      console.log(err);
    }
  };
  const deleteHandler = (userId) => {
    setDeleteUserId(userId);
    setOpenModal(true);
  };

  const confirmDeleteTask = async () => {
    try {
      const response = await userService.deleteUser(token, deleteUserId);
      if (response) {
        getUserData();
        setOpenModal(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow
              sx={{
                fontSize: '25px30px',
                fontWeight: '900',
                backgroundColor: '#0091ae1a',
              }}
            >
              <TableCell>Sl No</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Mobile</TableCell>
              <TableCell>Created On</TableCell>

              <TableCell>Action</TableCell>
              <TableCell>Block /Unblock</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((item, index) => (
              <TableRow key={item._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.username}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.mobile}</TableCell>
                <TableCell>{item.createdAt}</TableCell>

                <TableCell>
                  <Button
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    onClick={() => deleteHandler(item._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <DeleteModal
        title={'Confirm action'}
        openModal={openModal}
        setOpenModal={setOpenModal}
        confirmDeleteTask={confirmDeleteTask}
      >
        <ModalBody />
      </DeleteModal>
    </>
  );
}

function ModalBody() {
  return (
    <Box>
      <Typography>Do you want to delete user ?</Typography>
    </Box>
  );
}
