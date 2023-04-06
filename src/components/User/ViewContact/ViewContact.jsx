/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Avatar, Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import './ViewContact.css';
import { deepPurple } from '@mui/material/colors';
import dayjs from 'dayjs';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ContactDeleteModal from '../Popup/ContactDeleteModal';
import Popup from '../Popup/Popup';
import EditContactForm from '../Forms/Contacts/EditContactForm';
import * as contactService from '../../../services/contactService';

export default function ViewContact({
  selectedContact,
  setSingleView,
  users,
  getAllcontacts,
}) {
  const [openPopup, setOpenPopup] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const confirmDeleteContact = async () => {
    try {
      const res = await contactService.deleteContact(selectedContact._id);
      if (res) {
        setOpenDeleteModal(false);
        setSingleView(false);
        getAllcontacts();
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Box display="flex" flexDirection="column" height="600px">
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
          {selectedContact.firstname}
        </Typography>
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
          onClick={() => setOpenDeleteModal(true)}
        >
          <DeleteOutlineIcon sx={{ color: 'black', fontSize: '19px' }} />
        </Button>
      </Box>
      <Box
        className="main-container"
        flexGrow={1}
        overflow="auto"
        maxHeight="80vh"
        width="100%"
        sx={{ overflowX: 'hidden' }}
      >
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
                  Assigned to <span style={{ color: 'red' }}>*</span>
                </label>
                <span style={{ color: 'blue' }}>
                  {selectedContact.contact_owner.username}
                </span>
              </Box>
            </Box>
          </Box>
          <Box className="header-in">
            <Box>
              <label>
                Email <span style={{ color: 'red' }}>*</span>
              </label>
            </Box>

            <span style={{ color: 'blue' }}>{selectedContact.email}</span>
          </Box>
          <Box className="header-in">
            <label>
              Mobile <span style={{ color: 'red' }}>*</span>
            </label>
            <span style={{ color: 'blue' }}>{selectedContact.mobile}</span>
          </Box>
          <Box className="header-in">
            <label>
              Created on
              <span style={{ color: 'red' }}>*</span>
            </label>
            <span>{dayjs(selectedContact.createdAt).format('DD/MM/YYYY')}</span>
          </Box>
          <Box className="header-in">
            <label>
              Last Updated
              <span style={{ color: 'red' }}>*</span>
            </label>
            <span>{dayjs(selectedContact.updatedAt).format('DD/MM/YYYY')}</span>
          </Box>
        </Box>
        <Box className="metsec-onee">
          <Box className="header-in">
            <Box>
              <label>
                First Name <span style={{ color: 'red' }}>*</span>
              </label>
            </Box>

            <span>{selectedContact.firstname}</span>
          </Box>
          <Box className="header-in">
            <label>
              Last Name <span style={{ color: 'red' }}>*</span>
            </label>
            <span>{selectedContact.lastname}</span>
          </Box>
          <Box className="header-in">
            <label>
              Job Title
              <span style={{ color: 'red' }}>*</span>
            </label>
            <span>{selectedContact.job_title}</span>
          </Box>
          <Box className="header-in">
            <label>
              Lead Status
              <span style={{ color: 'red' }}>*</span>
            </label>
            <span>{selectedContact.lead_status}</span>
          </Box>
          <Box className="header-in">
            <label>
              Life Cycle Stage
              <span style={{ color: 'red' }}>*</span>
            </label>
            <span>{selectedContact.lifecycle_stage}</span>
          </Box>
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
      <ContactDeleteModal
        openDeleteModal={openDeleteModal}
        setOpenDeleteModal={setOpenDeleteModal}
        confirmDeleteContact={confirmDeleteContact}
      />
      <Popup
        title="Edit Contact"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <EditContactForm
          users={users}
          setOpenPopup={setOpenPopup}
          selectedContact={selectedContact}
          getAllContacts={getAllcontacts}
          setSingleView={setSingleView}
        />
      </Popup>
    </Box>
  );
}
