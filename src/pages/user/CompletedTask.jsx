import { Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import React, { useEffect, useState } from 'react';
import Header from '../../components/User/Header/Header';
import CompletedTaskTable from '../../components/User/Table/CompletedTaskTable';
import * as taskService from '../../services/taskService';

function CompletedTask() {
  const [completedTask, setCompletedTask] = useState([]);

  const { token } = JSON.parse(localStorage.getItem('user'));
  const getCompletedTask = async () => {
    try {
      const response = await taskService.completedTask(token);

      if (response) {
        setCompletedTask(response);
      } else {
        console.log('Completed task empty');
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getCompletedTask();
  }, []);
  return (
    <div>
      <Header />
      <Container maxWidth="xl">
        <Box sx={{ margin: '20px' }}>
          <Typography component="div" variant="h6">
            Completed Task
          </Typography>
          {completedTask?.length > 0 ? (
            <CompletedTaskTable completedTask={completedTask} />
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
        </Box>
      </Container>
    </div>
  );
}

export default CompletedTask;
