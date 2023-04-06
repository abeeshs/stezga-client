import { Box, Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Header from '../../components/User/Header/Header';
import * as meetingService from '../../services/meetingService';
import MeetingsTable from '../../components/User/MeetingsTable/MeetingsTable';
import MeetingForm from '../../components/User/Forms/MeetingForm/MeetingForm';
import Popup from '../../components/User/Popup/Popup';
import * as userService from '../../services/userService';

function Meetings() {
  const userData = JSON.parse(localStorage.getItem('user'));
 
  const token = userData?.token;
  const [meetings, setMeetings] = useState([]);
  const [openPopup, setOpenPopup] = useState('');
  const [users, setUsers] = useState([]);
  const getMeetings = async () => {
    try {
      const response = await meetingService.getMeetings();

      if (response.status === 'Success') {
        setMeetings(response.meetings);
      } else {
        setMeetings('');
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getUsersList = async () => {
    try {
      const response = await userService.viwAllusers(token);

      if (response.status === 'Success') {
        const arrObj = response.users.map((item) => ({
          label: item.username,
          value: item._id,
        }));

        setUsers(arrObj);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMeetings();
    getUsersList();
  }, []);

  return (
    <>
      <Header />

      <Box
        sx={{
          height: '80px',
          border: '1px solid rgb(223, 227, 235)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'white',
        }}
      >
        <Box
          sx={{
            width: '12rem',
            height: '2rem',
            margin: '3rem',
            textAlign: 'center',
          }}
        >
          <span
            className="commen-font"
            style={{
              fontSize: '1.3rem',
              fontWeight: '600',
              color: 'rgb(0, 145, 174)',
            }}
          >
            Meetings
          </span>
        </Box>
      </Box>
      {meetings?.length > 0 ? (
        <MeetingsTable
          meetings={meetings}
          getMeetings={getMeetings}
          users={users}
          setUsers={setUsers}
        />
      ) : (
        <Box
          sx={{
            width: '100%',
            height: '75vh',
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: 'white',
            marginTop: '5px',
          }}
        >
          <Box
            sx={{
              height: '80%',
              width: '30%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: '35px',
            }}
          >
            <img
              src="./images/emptyMeeting.png"
              alt=""
              style={{ width: '100%', height: '100%' }}
            />
            <span
              className="basic-font-all"
              style={{ color: 'grey', fontSize: '18px', fontWeight: '500' }}
            >
              You have no upcoming events & meetings
            </span>
            {userData.user.user_type === 'owner' ? (
              <Box sx={{ paddingTop: '10px' }}>
                <Button
                  sx={{
                    paddingTo: '15px',
                    backgroundColor: 'black',
                    '& .MuiButtonBase-root': {
                      backgroundColor: 'black',
                      '& :hover': { backgroundColor: 'black' },
                    },
                  }}
                  variant="contained"
                  onClick={() => setOpenPopup(true)}
                >
                  Create Meeting
                </Button>
              </Box>
            ) : (
              ''
            )}
          </Box>
          <Popup
            title="Create Meeting"
            width="md"
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
          >
            <MeetingForm
              users={users}
              setOpenPopup={setOpenPopup}
              getMeetings={getMeetings}
            />
          </Popup>
        </Box>
      )}
    </>
  );
}

export default Meetings;
