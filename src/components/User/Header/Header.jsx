import {
  AppBar,
  List,
  ListItem,
  ListItemButton,
  Toolbar,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import './Header.css';
import { useDispatch } from 'react-redux';
import * as authService from '../../../services/authService';
import { deleteUserToken } from '../../../features/auth/userAuthSlice';

function Header() {
  const userDetails = JSON.parse(localStorage.getItem('user'));
  const user = userDetails?.user;
  const navigate = useNavigate();
  const [tableType, setTableType] = useState('');
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const tableHandle = (type) => {
    setTableType(type);
  };
  const signOutHandler = async () => {
    const res = await authService.userLogout();
    if (res) {
      dispatch(deleteUserToken());
      navigate('/login');
    }
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar sx={{ backgroundColor: 'white' }}>
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              justifyContent: 'space-between',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'black',
                  textDecoration: 'none',
                }}
              >
                <img
                  src="/images/logo2.jpg"
                  alt=""
                  style={{ width: '130px', height: '40px' }}
                />
              </Typography>

              <Typography
                className="dropdown"
                variant="h6"
                noWrap
                component="div"
                onClick={() => navigate('/contacts')}
                sx={{
                  color: 'black',
                  height: '28px',
                  fontSize: '16px',
                  fontFamily: 'sans-serif',
                  paddingLeft: '40px',
                  cursor: 'pointer',
                }}
              >
                Contacts
              </Typography>

              <Box class="dropdown">
                <Typography
                  className="dropdown"
                  variant="h6"
                  noWrap
                  component="div"
                  onClick={() => navigate('/task')}
                  sx={{
                    color: 'black',
                    height: '28px',
                    fontSize: '16px',
                    fontFamily: 'sans-serif',
                    paddingLeft: '40px',
                    cursor: 'pointer',
                  }}
                >
                  Task
                </Typography>

                <div className="dropdown-content">
                  <List>
                    <ListItem disablePadding>
                      <ListItemButton
                        onClick={() => navigate('/task/pending-task')}
                      >
                        <Typography
                          sx={{
                            color: 'Black',
                            fontSize: '15px',
                            paddingLeft: '7px',
                          }}
                        >
                          {' '}
                          Pending Task
                        </Typography>
                      </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                      <ListItemButton
                        onClick={() => navigate('/task/completed-task')}
                      >
                        <Typography sx={{ color: 'Black', fontSize: '15px' }}>
                          {' '}
                          Completed Task
                        </Typography>
                      </ListItemButton>
                    </ListItem>
                  </List>
                </div>
              </Box>
              <Typography
                variant="h6"
                noWrap
                component="div"
                onClick={() => navigate('/conversation')}
                sx={{
                  color: 'black',
                  fontSize: '16px',
                  fontFamily: 'sans-serif',
                  paddingLeft: '30px',
                  cursor: 'pointer',
                }}
              >
                Conversation
              </Typography>
              <Typography
                variant="h6"
                noWrap
                component="div"
                onClick={() => navigate('/deals')}
                sx={{
                  color: 'black',
                  fontSize: '16px',
                  fontFamily: 'sans-serif',
                  paddingLeft: '30px',
                  cursor: 'pointer',
                }}
              >
                Deals
              </Typography>

              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                  color: 'black',
                  fontSize: '16px',
                  fontFamily: 'sans-serif',
                  paddingLeft: '30px',
                  cursor: 'pointer',
                }}
              >
                Reports
              </Typography>

              <Typography
                variant="h6"
                noWrap
                component="div"
                onClick={() => navigate('/meetings')}
                sx={{
                  color: 'black',
                  fontSize: '16px',
                  fontFamily: 'sans-serif',
                  paddingLeft: '30px',
                  cursor: 'pointer',
                }}
              >
                Meetings
              </Typography>
              {user && user?.user_type === 'owner' ? (
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  onClick={() => navigate('/users')}
                  sx={{
                    color: 'black',
                    fontSize: '16px',
                    fontFamily: 'sans-serif',
                    paddingLeft: '30px',
                    cursor: 'pointer',
                  }}
                >
                  Users
                </Typography>
              ) : (
                ''
              )}
            </Box>
            <Box>
              <div onClick={() => setOpen(!open)} style={{ float: 'right' }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </div>
              <div onClick={() => setOpen(!open)} style={{ float: 'right' }}>
                <NotificationsNoneIcon sx={{ color: 'grey', m: 1, mr: 1 }} />
              </div>
              <div className="menu-container">
                <div className="menu-trigger"></div>
                <div
                  className={`dropdown-menu ${open ? 'active' : 'inactive'}`}
                >
                  <div className="profile-image">
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/1.jpg"
                    />

                    <h3>
                      {user?.username}
                      <br />
                      <span>{user?.email}</span>
                    </h3>
                  </div>
                  <ul>
                    <li
                      className="dropdownItem"
                      onClick={() => navigate('/profile')}
                    >
                      <AccountCircleIcon />
                      <p>Account</p>
                    </li>
                    <li className="dropdownItem">
                      <AccountCircleIcon />
                      <p>General</p>
                    </li>
                    <li className="dropdownItem">
                      <AccountCircleIcon />
                      <p>Notification</p>
                    </li>

                    <li className="dropdownItem">
                      <AccountCircleIcon />
                      <p>Setting</p>
                    </li>
                  </ul>
                  <div className="sign-out">
                    <h3 className="logout" onClick={() => signOutHandler()}>
                      Sign out
                    </h3>
                  </div>
                </div>
              </div>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
