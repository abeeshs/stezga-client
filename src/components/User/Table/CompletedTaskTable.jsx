/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
  Button,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import Table from '@mui/material/Table';
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';
import Popup from '../Popup/Popup';

import TaskViewTable from './TaskViewTable';

function CompletedTaskTable({ completedTask }) {
  const [openPopup, setOpenPopup] = useState(false);
  const [viewTask, setViewTask] = useState({});

  const handleOpen = (item) => {
    setViewTask(item);
    setOpenPopup(true);
  };
  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ backgroundColor: 'black' }}>
            <TableRow sx={{ fontSize: '25px', fontWeight: 500 }}>
              <TableCell sx={{ color: 'white' }}>Title</TableCell>
              <TableCell sx={{ color: 'white' }}>Task Type</TableCell>
              <TableCell sx={{ color: 'white' }}>Created By</TableCell>
              <TableCell sx={{ color: 'white' }}>Priority</TableCell>
              <TableCell sx={{ color: 'white' }}>Due Date</TableCell>
              <TableCell sx={{ color: 'white' }}>Task Status</TableCell>
              <TableCell sx={{ color: 'white' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ backgroundColor: 'white' }}>
            {completedTask.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.task_type}</TableCell>
                <TableCell>{item.created_by.firstname}</TableCell>
                <TableCell>{item.priority}</TableCell>
                <TableCell>{item.due_date}</TableCell>
                <TableCell>{item.task_status}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleOpen(item)}
                  >
                    <OpenInBrowserIcon />
                    Open
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Popup title="Task" openPopup={openPopup} setOpenPopup={setOpenPopup}>
        <TaskViewTable viewTask={viewTask} setViewTask={setViewTask} />
      </Popup>
    </>
  );
}

export default CompletedTaskTable;
