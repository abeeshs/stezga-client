import { Avatar, Box, Button, Card, Input, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { deepPurple } from '@mui/material/colors';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import dayjs from 'dayjs';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { Toaster, toast } from 'react-hot-toast';
import * as taskService from '../../../services/taskService';
// import Popup from '../Popup/Popup';

function ViewTask({ selectedTask, setSingleView }) {
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [fileLink, SetFileLink] = useState('');

  const { user } = JSON.parse(localStorage.getItem('user'));

  const verifyHandle = async () => {
    try {
      const response = await taskService.verifyTask(selectedTask._id);
      if (response.status === 'Success') {
        setSingleView(false);
        toast.success('Status Changes Successfully');
      }
    } catch (err) {
      console.log(err);
    }
  };
  const completedHandle = async () => {
    try {
      const response = await taskService.completeTask(selectedTask._id);
      if (response.status === 'Success') {
        setSingleView(false);
        toast.success('Status Changes Successfully');
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleFileChange = (event) => {
    const filecheck = event.target.files[0];
    const allowedExtensions = /(\.pdf|\.doc)$/i;
    if (!allowedExtensions.exec(filecheck.name)) {
      setErrorMessage('Please select a file with .pdf or .doc extension.');
      setFile(null);
      event.target.value = '';
    } else {
      setFile(filecheck);
      setErrorMessage('');
    }
  };
  const handleFileUpload = async () => {
    console.log(file);
    try {
      const data = new FormData();
      data.append('file', file);
      const response = await taskService.uploadFile(data, selectedTask._id);
      console.log(response);
      if (response.status === 'Success') {
        setSuccess(true);
        toast.success('File uploaded successfully');
      }
    } catch (err) {
      toast.error(err);
    }
  };

  const getFile = async () => {
    try {
      const response = await taskService.getTaskFile(selectedTask?.file);
      console.log(response);
      if (response.status === 'Success') {
        SetFileLink(response.url);
        console.log('object');
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getFile();
  }, []);
  console.log(selectedTask);
  return (
    <Box display="flex" flexDirection="column" height="600px">
      <Toaster />
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
          {selectedTask.title}
        </Typography>
        <Button
          sx={{
            margin: '5px',
            backgroundColor: '#f0f1f3',

            ':hover': { backgroundColor: '#d8dee9 ' },
          }}
          //   onClick={() => setOpenPopup(true)}
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
          //   onClick={() => setOpenDeleteModal(true)}
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
                  Created By <span style={{ color: 'red' }}>*</span>
                </label>
                <span style={{ color: 'blue' }}>
                  {selectedTask.created_by?.username}
                </span>
              </Box>
            </Box>
          </Box>
          <Box className="header-in">
            <Box>
              <label>
                Task Type <span style={{ color: 'red' }}>*</span>
              </label>
            </Box>

            <span style={{ color: 'blue' }}>{selectedTask.task_type}</span>
          </Box>
          <Box className="header-in">
            <label>
              Priority <span style={{ color: 'red' }}>*</span>
            </label>
            <span style={{ color: 'blue' }}>{selectedTask.priority}</span>
          </Box>
          <Box className="header-in">
            <label>
              Due Date
              <span style={{ color: 'red' }}>*</span>
            </label>
            <span>{dayjs(selectedTask.due_date).format('DD/MM/YYYY')}</span>
            {dayjs(selectedTask.due_date) < dayjs(new Date()) ? (
              <span style={{ color: 'red' }}>Overdue task</span>
            ) : (
              ''
            )}
          </Box>
          <Box className="header-in">
            <label>
              Due time
              <span style={{ color: 'red' }}>*</span>
            </label>
            <span>{selectedTask.due_time}</span>
          </Box>
        </Box>
        <Box className="metsec-onee">
          <Box sx={{ width: '100%', height: '100%' }}>
            <Box
              sx={{
                width: '100%',
                height: '20px',
                display: 'flex',
                justifyContend: 'center',
                textAlign: 'center',
              }}
            >
              <span className="only-font">Task Members</span>
            </Box>
            <Box
              className="only-font"
              sx={{ width: '100%', height: '100%', display: 'flex' }}
            >
              {selectedTask.assigned_to.map((e) => {
                return (
                  <Box
                    sx={{
                      width: '12%',
                      height: '70%',
                      borderRight: '1px solid rgb(231, 229, 229)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Box>
                      <span style={{ color: 'blue' }}>{e.name}</span>
                    </Box>
                  </Box>
                );
              })}
            </Box>
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
              Upload Tasks Documents
            </p>
          </Box>
          <Box
            className="m-activities"
            sx={{ height: '300px !important', display: 'flex' }}
          >
            <Box
              sx={{
                width: '50%',
                height: ' 300px',
                borderRight: '1px solid rgb(231, 229, 229)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {user?.user_type === 'owner' || selectedTask.file ? (
                <Card sx={{ maxWidth: 345 }}>
                  <a href={fileLink}>
                    <PictureAsPdfIcon
                      sx={{
                        color: 'red',
                        height: '120px',
                        cursor: 'pointer',
                        width: '100px',
                        '& :hover': { boxShadow: '20px 20px 50px grey' },
                      }}
                    />
                  </a>
                </Card>
              ) : (
                ''
              )}

              {errorMessage && (
                <p style={{ textAlign: 'center', color: 'red' }}>
                  {errorMessage}
                </p>
              )}
              {!success ||
                (user?.user_type === 'user' && (
                  <Box>
                    <Input
                      accept=".pdf,.doc,.docx"
                      id="file-upload"
                      type="file"
                      onChange={handleFileChange}
                      sx={{ display: 'none' }}
                    />
                    <label htmlFor="file-upload">
                      <Button
                        variant="contained"
                        component="span"
                        startIcon={<CloudUploadIcon />}
                        sx={{ borderRadius: 0 }}
                      >
                        Choose File
                      </Button>
                    </label>
                    <Button
                      variant="contained"
                      onClick={handleFileUpload}
                      disabled={!file}
                      sx={{ borderRadius: 0 }}
                    >
                      Upload
                    </Button>
                    {file && (
                      <div sx={{ display: 'flex', alignItems: 'center' }}>
                        <span sx={{ mr: 1 }}>{file.name}</span>
                        <Button
                          variant="outlined"
                          onClick={() => setFile(null)}
                        >
                          Clear
                        </Button>
                      </div>
                    )}
                  </Box>
                ))}
            </Box>
            <Box sx={{ width: '50%', height: ' 300px' }}>
              <Box
                className="only-font"
                sx={{
                  width: '100%',
                  height: '80px',
                  display: 'flex',
                  justifyContent: 'space-around',
                  padding: '15px',
                }}
              >
                <Box className="header-in">
                  <Box>
                    <label style={{ fontSize: '15px', fontWeight: '600' }}>
                      Task Status
                    </label>
                  </Box>
                </Box>
                <Box className="header-in">
                  <span
                    style={{
                      color: 'blue',
                      fontSize: '15px',
                      fontWeight: '600',
                    }}
                  >
                    {selectedTask.task_status}
                  </span>
                </Box>
                {/* <Typography variant="p" fontWeight="600">
                  {' '}
                  Task Status
                </Typography>
                <Typography variant="p">{selectedTask.task_status}</Typography> */}
              </Box>
              <Box
                sx={{
                  width: '100%',
                  height: '60px',

                  display: 'flex',
                  justifyContent: 'space-around',
                }}
              >
                {user?.user_type === 'owner' &&
                selectedTask.task_status === 'Task Varifying' ? (
                  <Button
                    onClick={verifyHandle}
                    variant="contained"
                    sx={{
                      backgroundColor: '#00a4bd',
                      float: 'right',
                      marginBottom: '20px',
                      '&:hover': {
                        backgroundColor: '#00a4bd',
                      },
                    }}
                  >
                    Mark as Varified
                  </Button>
                ) : selectedTask.task_status === 'Pending' ? (
                  <Button
                    onClick={completedHandle}
                    variant="contained"
                    sx={{
                      backgroundColor: '#00a4bd',
                      float: 'right',
                      marginBottom: '20px',
                      '&:hover': {
                        backgroundColor: '#00a4bd',
                      },
                    }}
                  >
                    Mark as Completed
                  </Button>
                ) : (
                  ''
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      {/* <ContactDeleteModal
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
          selectedTask={selectedTask}
          getAllContacts={getAllcontacts}
          setSingleView={setSingleView}
        />
      </Popup> */}
    </Box>
  );
}

export default ViewTask;
