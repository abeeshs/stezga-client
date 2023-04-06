import { Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import React, { useEffect, useState } from 'react';
import Header from '../../components/User/Header/Header';
import PendingTaskTable from '../../components/User/Table/PendingTaskTable';
import * as taskService from '../../services/taskService';

function PendingTask() {
  const [pendingTask, setPendingTask] = useState([]);
  const { token } = JSON.parse(localStorage.getItem('user'));

  const getPendingTask = async () => {
    try {
      const response = await taskService.getPendingTask(token);
      if (response) {
        setPendingTask(response);
      } else {
        console.log('Pending task empty');
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getPendingTask();
  }, []);

  return (
    <div>
      <Header />
      <Container maxWidth="xl">
        <Box sx={{ margin: '20px' }}>
          <Typography component="div" variant="h6">
            Pending Task
          </Typography>
        </Box>
        {pendingTask?.length > 0 ? (
          <PendingTaskTable pendingTask={pendingTask} />
        ) : (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-evenly',
              alignItems: 'center',
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
          </div>
        )}
      </Container>
    </div>
  );
}

export default PendingTask;
