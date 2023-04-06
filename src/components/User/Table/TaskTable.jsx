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
import SingleViewModal from '../../Extra Components/SingleViewModal/SingleViewModal';
import ViewTask from '../ViewTask/ViewTask';

function TaskTable(props) {
  const { userTask } = props;
  // const [openPopup, setOpenPopup] = useState(false);
  const [selectedTask, setSelectedTask] = useState({});
  const [singleView, setSingleView] = useState(false);

  const handleOpen = (item) => {
    setSelectedTask(item);
    setSingleView(true);
  };

  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: 650 }}>
          <TableHead
            sx={{
              backgroundColor: 'black',
              fontWeight: '900',
            }}
          >
            <TableRow sx={{ fontSize: '25px' }}>
              <TableCell
                sx={{ fontSize: '15PX', fontWeight: '500', color: 'white' }}
              >
                Title
              </TableCell>
              <TableCell
                sx={{ fontSize: '15PX', fontWeight: '500', color: 'white' }}
              >
                Task Type
              </TableCell>
              <TableCell
                sx={{ fontSize: '15PX', fontWeight: '500', color: 'white' }}
              >
                Created By
              </TableCell>
              <TableCell
                sx={{ fontSize: '15PX', fontWeight: '500', color: 'white' }}
              >
                Priority
              </TableCell>
              <TableCell
                sx={{ fontSize: '15PX', fontWeight: '500', color: 'white' }}
              >
                Due Date
              </TableCell>
              <TableCell
                sx={{ fontSize: '15PX', fontWeight: '500', color: 'white' }}
              >
                Task Status
              </TableCell>
              <TableCell
                sx={{ fontSize: '15PX', fontWeight: '500', color: 'white' }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ backgroundColor: 'white' }}>
            {userTask?.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.task_type}</TableCell>
                <TableCell>{item.created_by?.firstname}</TableCell>
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
      <SingleViewModal title="Meeting" singleView={singleView}>
        <ViewTask
          selectedTask={selectedTask}
          setSelectedTask={setSelectedTask}
          setSingleView={setSingleView}
        />
      </SingleViewModal>
    </>
  );
}

export default TaskTable;
