/* eslint-disable react/prop-types */
import { Avatar, Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { deepPurple } from '@mui/material/colors';
import './ViewMeeting.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { toast } from 'react-hot-toast';
import TabsView from '../../Extra Components/TabsView/TabsView';
import EditMeeting from '../Forms/EditMeeting/EditMeeting';
import DeleteModal from '../../Extra Components/DeleteModal';
import Popup from '../Popup/Popup';
import * as meetingService from '../../../services/meetingService';

export default function ViewMeeting({
  selectedMeeting,
  setSingleView,
  getMeetings,
}) {
  const { user } = JSON.parse(localStorage.getItem('user'));
  const [openPopup, setOpenPopup] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const confirmDelete = async () => {
    const response = await meetingService.deleteMeeting(selectedMeeting._id);
    if (response.status === 'Success') {
      setOpenModal(false);
      setSingleView(false);
      getMeetings();
      toast.success('Deleted successfully!');
    }
  };

  return (
    <Box display="flex" flexDirection="column" height="500px">
      <Box
        sx={{
          display: 'flex',
          height: '50px',
          borderBottom: '1px solid rgb(231, 229, 229)',
          width: '100%',
        }}
      >
        <ArrowBackIcon
          sx={{
            padding: '5px',
            padddingRight: '5px',
            color: 'rgb(0, 145, 174)',
            ':hover': { color: 'red ', boxShadow: '2px' },
          }}
          onClick={() => setSingleView(false)}
        />
        <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
          {selectedMeeting.event_title}
        </Typography>
        {user?.user_type === 'owner' ? (
          <Box>
            <Button
              sx={{
                margin: '5px',
                backgroundColor: '#f0f1f3',

                ':hover': { backgroundColor: '#d8dee9 ' },
              }}
              onClick={() => setOpenPopup(true)}
            >
              <EditIcon sx={{ color: 'black', fontSize: '19px' }} />
            </Button>
            <Button
              size="small"
              sx={{
                margin: '5px',
                backgroundColor: '#f0f1f3',
                ':hover': { backgroundColor: '#d8dee9 ' },
              }}
              onClick={() => setOpenModal(true)}
            >
              <DeleteOutlineIcon sx={{ color: 'black', fontSize: '19px' }} />
            </Button>
          </Box>
        ) : (
          ''
        )}
      </Box>
      <Box className="main-container">
        <Box className="main-header">
          <Box className="header-in">
            <Box sx={{ display: 'flex', width: '100%', paddingLeft: '15px' }}>
              <Box sx={{ width: '30%', height: '100%' }}>
                <Avatar sx={{ bgcolor: deepPurple[500] }} />
              </Box>
              <Box
                sx={{
                  width: '60%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <label>
                  Assigned to
                  <span style={{ color: 'red' }}>*</span>
                </label>
                <span>{selectedMeeting.organizer.username}</span>
              </Box>
            </Box>
          </Box>
          <Box className="header-in">
            <Box>
              <label>
                Start Date & Time <span style={{ color: 'red' }}>*</span>
              </label>
            </Box>

            <span>{selectedMeeting.start_date}</span>
          </Box>
          <Box className="header-in">
            <label>
              End Date & Time
              <span style={{ color: 'red' }}>*</span>
            </label>
            <span>{selectedMeeting.end_date}</span>
          </Box>
          <Box className="header-in">
            <label>
              Priority
              <span style={{ color: 'red' }}>*</span>
            </label>
            <span>{selectedMeeting.type}</span>
          </Box>
          <Box className="header-in">
            <label>
              Related To
              <span style={{ color: 'red' }}>*</span>
            </label>
            <span>Nil</span>
          </Box>
        </Box>
        <Box className="metsec-one">
          <TabsView
            title={selectedMeeting.event_title}
            description={selectedMeeting.description}
            participands={selectedMeeting.participands}
          />
        </Box>
        <Box className="metsec-two">
          <Box sx={{ widht: '100%', height: '30px' }}>
            <p
              className="only-font"
              style={{
                paddingLeft: '15px',
                fontWeight: '500',
                fontSize: '16px',
              }}
            >
              Activity
            </p>
          </Box>
          <Box className="m-activities">
            <Box sx={{ width: '50%', height: ' 225px' }}>
              <img
                src="https://stezga.od2.vtiger.com/layouts/v9/assets/images/Notifications_NoRecords.svg"
                alt=""
              />
            </Box>
          </Box>
        </Box>
      </Box>
      <DeleteModal
        title="Delete Meeting"
        message="Do you want to delete this meeting ?"
        openModal={openModal}
        confirmDelete={confirmDelete}
        setOpenModal={setOpenModal}
      />
      <Popup
        title="Edit Meeting"
        width="md"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <EditMeeting
          selectedMeeting={selectedMeeting}
          setSingleView={setSingleView}
          getMeetings={getMeetings}
          setOpenPopup={setOpenPopup}
        />
      </Popup>
    </Box>
  );
}
