import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputLabel,
  TextField,
} from '@mui/material';
import makeAnimated from 'react-select/animated';
import React, { useState } from 'react';
import Select from 'react-select';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as taskService from '../../../../services/taskService';

const taskType = [
  { value: 'To-do', label: 'To-do' },
  { value: 'Call', label: 'Call' },
  { value: 'Email', label: 'Email' },
];
const priorityy = [
  { value: 'Low', label: 'Low' },
  { value: 'Medium', label: 'Medium' },
  { value: 'High', label: 'High' },
];

function AddTaskForm({ open, setOpen, allContacts, users, getTask }) {
  const [assignedUser, setAssignedUser] = useState({});
  const [priority, setPriority] = useState({});
  const [types, setType] = useState({});
  const [associated, setAssociated] = useState({});
  const [error, setError] = useState('');

  const schema = yup.object().shape({
    title: yup.string().required('Title  is required*'),
    dueDate: yup.string().required('Date  is required*'),
    time: yup.string().required('Time  is required*'),
    description: yup.string().required('Description  is required*'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [newTask, setNewTask] = useState({});
  const animatedComponents = makeAnimated();
  const createTask = async () => {
    if (
      Object.keys(assignedUser).length === 0 ||
      Object.keys(priority).length === 0 ||
      Object.keys(types).length === 0
    ) {
      setError('All fields required');
    } else {
      setError('');
      const taskAssingnedTo = assignedUser.map((item) => {
        return {
          name: item.label,
          userId: item.value,
        };
      });
      newTask.assignedTo = taskAssingnedTo;
      newTask.priority = priority.value;
      newTask.type = types.value;
      newTask.associated = associated.value;

      const data = await taskService.createTask(newTask);
      if (data.status === 'Success') {
        setOpen(false);
        getTask();
      }
    }
  };

  const onSubmit = async (data) => {
    if (data) {
      setNewTask(data);
      createTask();
    }
  };
  // -------Creating new task

  // select multippile option
  const selectMulti = (assigned) => {
    setAssignedUser(assigned);
  };
  const selectPriority = (prior) => {
    setPriority(prior);
  };
  const selectType = (type) => {
    setType(type);
  };
  const selectAssociated = (asso) => {
    setAssociated(asso);
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingRight: '26px',
        }}
      >
        <DialogTitle id="alert-dialog-title">Create Task</DialogTitle>
        <Button
          className="close-btn"
          variant="contained"
          onClick={() => setOpen(false)}
        >
          X
        </Button>
      </Box>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {error && (
            <Alert severity="error" style={{ color: 'red' }}>
              {error}
            </Alert>
          )}
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <InputLabel
              id="demo-simple-select-autowidth-label"
              style={{
                marginLeft: '10px',
                paddingTop: '10px',
                color: 'black',
              }}
            >
              Title
            </InputLabel>
            <TextField
              id="outlined-basic"
              className="outlined-basic1"
              fullWidth
              variant="outlined"
              error={!!errors.title}
              helperText={errors.title ? errors.title.message : ''}
              {...register('title')}
            />
            <InputLabel
              id="demo-simple-select-autowidth-label"
              style={{
                marginLeft: '10px',
                paddingTop: '10px',
                color: 'black',
              }}
            >
              Type
            </InputLabel>
            <Select
              className="basic-single"
              value={types}
              onChange={selectType}
              options={taskType}
            />
            <InputLabel
              id="demo-simple-select-autowidth-label"
              style={{
                marginLeft: '10px',
                paddingTop: '10px',
                color: 'black',
              }}
            >
              Priority
            </InputLabel>
            <Select
              className="basic-single"
              value={priority}
              onChange={selectPriority}
              options={priorityy}
            />
            <InputLabel
              id="demo-simple-select-autowidth-label"
              style={{
                marginLeft: '10px',
                paddingTop: '10px',
                color: 'black',
              }}
            >
              Associated with records
            </InputLabel>
            <Select
              className="basic-single"
              value={associated}
              onChange={selectAssociated}
              options={allContacts}
            />

            <InputLabel
              id="demo-simple-select-autowidth-label"
              style={{
                marginLeft: '10px',
                paddingTop: '10px',
                color: 'black',
              }}
            >
              Assigned to
            </InputLabel>
            <Select
              isMulti
              value={assignedUser}
              components={animatedComponents}
              onChange={selectMulti}
              options={users}
            />

            <InputLabel
              id="demo-simple-select-autowidth-label"
              style={{ width: '100px', paddingTop: '10px', color: 'black' }}
            >
              Due Date
            </InputLabel>
            <TextField
              id="outlined-basic"
              className="outlined-basic"
              variant="outlined"
              fullWidth
              type="date"
              error={!!errors.dueDate}
              helperText={errors.dueDate ? errors.dueDate.message : ''}
              {...register('dueDate')}
            />
            <InputLabel
              id="demo-simple-select-autowidth-label"
              style={{
                marginLeft: '10px',
                width: '100px',
                paddingTop: '10px',
                color: 'black',
              }}
            >
              Time
            </InputLabel>
            <TextField
              id="outlined-basic"
              className="outlined-basic"
              type="time"
              variant="outlined"
              fullWidth
              error={!!errors.time}
              helperText={errors.time ? errors.time.message : ''}
              {...register('time')}
            />
            <Box>
              <InputLabel
                id="demo-simple-select-autowidth-label"
                style={{ marginLeft: '10px', width: '100px', color: 'black' }}
              >
                Note
              </InputLabel>

              <TextField
                sx={{
                  paddingTop: '20px',
                  marginBottom: '10px',
                  maxHeight: '100px',
                  overflowY: 'scroll',
                }}
                multiline
                fullWidth
                id="outlined-basic"
                className="note"
                variant="outlined"
                error={!!errors.description}
                helperText={
                  errors.description ? errors.description.message : ''
                }
                {...register('description')}
              />
            </Box>

            <Button
              type="submit"
              className="create-task-btn"
              variant="contained"
              autoFocus
            >
              Create
            </Button>
          </form>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}

export default AddTaskForm;
