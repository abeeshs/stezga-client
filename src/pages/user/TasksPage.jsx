import { Box, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Container } from '@mui/system';
import TaskTable from '../../components/User/Table/TaskTable';
import * as taskService from '../../services/taskService';
import * as contactService from '../../services/contactService';
import * as userService from '../../services/userService';
import Header from '../../components/User/Header/Header';
import AddTaskForm from '../../components/User/Forms/AddTaskForm/AddTaskForm';

function TasksPage() {
  const [userTask, setUserTask] = useState([]);
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [allContacts, setAllContacts] = useState([]);
  const userData = JSON.parse(localStorage.getItem('user'));
  const token = userData?.token;
  const user = userData?.user;

  const getTask = async () => {
    const response = await taskService.getUserTask(token);
    setUserTask(response);
  };
  // calling function to get all tasks
  const getContacts = async () => {
    const response = await contactService.getAllContact(token);

    if (response) {
      const arrObj = response.map((item) => {
        return {
          label: item.firstname,
          value: item._id,
        };
      });
      setAllContacts(arrObj);
    }
    // get user data to display in input field
    const userData = await userService.viwAllusers(token);
    if (userData?.status === 'Success') {
      const arrObj = userData.users.map((item) => {
        return {
          label: item.username,
          value: item._id,
        };
      });

      setUsers(arrObj);
    }
  };

  useEffect(() => {
    getTask();
    getContacts();
  }, []);
  const boxSX = {
    backgroundColor: '#00a4bd',
    float: 'right',
    marginBottom: '20px',
    '&:hover': {
      backgroundColor: '#00a4bd',
    },
  };
  return (
    <Box>
      <Header />
      <Box
        sx={{
          height: '70px',
          border: '1px solid rgb(223, 227, 235)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'white',
        }}
      >
        <Box sx={{ padding: '55px' }}>
          <p className="page-heading">Tasks</p>
        </Box>

        <Box
          sx={{
            width: '150px',
            height: '50px',
            marginRight: '25px',
          }}
        >
          {user?.user_type === 'owner' ? (
            <Button
              sx={boxSX}
              variant="contained"
              onClick={() => setOpen(true)}
            >
              Create Task
            </Button>
          ) : (
            ''
          )}
        </Box>
      </Box>

      <Container maxWidth="xl" sx={{ marginTop: '50px' }}>
        {userTask?.length > 0 ? (
          <TaskTable userTask={userTask} />
        ) : (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              backgroundColor: 'white',
              height: '100%',
              width: '100%',
            }}
          >
            <img
              src="/images/empty.jpg"
              style={{ width: '400px', height: '400px' }}
              alt=""
            />
            <h2 className="commen-font" style={{ fontWeight: '800' }}>
              No tasks yet
            </h2>
          </Box>
        )}
      </Container>

      <AddTaskForm
        users={users}
        allContacts={allContacts}
        open={open}
        setOpen={setOpen}
        getContacts={getContacts}
        getTask={getTask}
      />
    </Box>
  );
}

export default TasksPage;
