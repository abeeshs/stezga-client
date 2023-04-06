import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import * as userService from '../../services/userService';
import Header from '../../components/User/Header/Header';
import dayjs from 'dayjs';

function Profile() {
  const { token } = JSON.parse(localStorage.getItem('user'));
  const [profileData, setProfileData] = useState({});
  console.log(profileData.email);
  const obj = {};
  const handleProfile = async (e) => {
    const { name, value } = e.target;
    obj[name] = value;

    const response = await userService.editProfileService(obj);
    if (response.status === 'Success') {
      toast.success('Profile updated successfully');
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfileData((profileData[name] = value));
  };
  const getUserProfile = async () => {
    try {
      const response = await userService.getUserService(token);
      if (response.status === 'Success') {
        setProfileData(response.user);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);
  return (
    <>
      <Header />
      <Toaster />
      <Box
        sx={{
          width: '100%',
          height: '650px',
          border: '1px solid rgb(223, 227, 235)',
        }}
      >
        <Box
          sx={{
            width: '100%',
            height: '65px',
            backgroundColor: 'white',
            marginTop:'-13px'
          }}
        >
          <p
            className="commen-font"
            style={{
              padding:'15px',
              fontSize: '1.3rem',
              fontWeight: '600',
              color: 'rgb(0, 145, 174)',
            }}
          >
            Profile
          </p>
        </Box>
        <Box
          sx={{
            width: '100%',
            height: '90%',
            display: 'flex',
            marginTop: '10px',

            backgroundColor: '#26323',
          }}
        >
          <Box
            sx={{
              width: '15%',
              height: '100%',
              backgroundColor: '#263238',
              border: '1px solid grey',
            }}
          >
            <List>
              <ListItem disablePadding>
                <ListItemButton
                  sx={{ backgroundColor: 'black', color: 'white' }}
                >
                  <ListItemIcon>{/* <InboxIcon /> */}</ListItemIcon>
                  <ListItemText primary="General" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>{/* <DraftsIcon /> */}</ListItemIcon>
                  <ListItemText primary="" />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
          <Box
            sx={{
              width: '85%',
              height: '100%',
              backgroundColor: 'white',
              border: '1px solid grey',
            }}
          >
            <Box
              sx={{
                width: '100%',
                height: '70px',

                display: 'flex',
              }}
            >
              <Box
                sx={{
                  width: '60px',
                  height: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Avatar />
              </Box>
              <Box
                sx={{
                  width: '60px',
                  height: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {profileData.username}
              </Box>
            </Box>
            <Box
              sx={{
                width: '100%',
                height: '500px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  borderBottom: '1px solid grey',
                  width: '98%',
                  height: '250px',
                }}
              >
                <Box sx={{ height: '15px', width: '100%' }}>
                  User Information
                </Box>
                <Box sx={{ height: '100%', width: '100%' }}>
                  <table className="table-detailview">
                    <tbody>
                      <tr>
                        <td className="dview-label">Username</td>
                        <td>
                          <input
                            className="profile-input"
                            name="username"
                            value={profileData?.username}
                            onBlur={handleProfile}
                          />
                        </td>
                        <td className="dview-label">User Type</td>
                        <td>
                          <input
                            className="profile-input"
                            value={profileData?.user_type}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="dview-label">Email</td>
                        <td>
                          <input
                            className="profile-input"
                            value={profileData?.email}
                            disabled
                          />
                        </td>
                        <td className="dview-label">Contact number</td>
                        <td>
                          <input
                            className="profile-input"
                            disabled
                            value={profileData?.mobile}
                            onBlur={handleProfile}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="dview-label">First Name</td>
                        <td>
                          <input
                            className="profile-input"
                            name="firstname"
                            onBlur={handleProfile}
                            onChange={handleChange}
                            value={profileData?.firstname}
                          />
                        </td>
                        <td className="dview-label">Last Name</td>
                        <td>
                          <input
                            className="profile-input"
                            name="lastname"
                            value={profileData?.lastname}
                            onChange={handleChange}
                            onBlur={handleProfile}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Box>
              </Box>
              <Box sx={{ width: '98%', height: '250px' }}>
                <Box sx={{ height: '15px', width: '100%' }}>
                  Company Information
                </Box>
                <Box sx={{ height: '100%', width: '100%' }}>
                  <table className="table-detailview">
                    <tbody>
                      <tr>
                        <td className="dview-label">Company</td>
                        <td>
                          <input
                            className="profile-input"
                            name="lastname"
                            disabled
                            value={profileData?.company_id?.name}
                          />
                        </td>
                        <td className="dview-label">Contact Number</td>
                        <td>
                          <input className="profile-input" name="mobile" />
                        </td>
                      </tr>
                      <tr>
                        <td className="dview-label">Email</td>
                        <td>
                          <input className="profile-input" />
                        </td>
                        <td className="dview-label">Address</td>
                        <td>
                          <input className="profile-input" />
                        </td>
                      </tr>
                      <tr>
                        <td className="dview-label">Created on</td>
                        <td>
                          <input
                            className="profile-input"
                            disabled
                            value={dayjs(
                              profileData?.company_id?.createdAt
                            ).format('DD/MM/YYYY')}
                          />
                        </td>
                        <td className="dview-label">Last Updated On</td>
                        <td>
                          <input
                            className="profile-input"
                            disabled
                            value={dayjs(
                              profileData?.company_id?.updatedAt
                            ).format('DD/MM/YYYY')}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Profile;
