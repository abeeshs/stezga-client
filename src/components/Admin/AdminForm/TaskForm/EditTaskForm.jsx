/* eslint-disable react/prop-types */
import { Button, InputLabel, TextField } from '@mui/material';
import Select from 'react-select';
import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import UpgradeSharpIcon from '@mui/icons-material/UpgradeSharp';
import { Box } from '@mui/system';
import { useSelector } from 'react-redux';
import makeAnimated from 'react-select/animated';
import * as taskService from '../../../../services/taskService';

function EditTaskForm(props) {
  const test = { label: 'no text', value: 'tes55t' };
  const {
    editTask,
    setOpenPopup,
    getAllTasks,
    users,
    allContacts,
    taskType,
    priorityy,
  } = props;
  const animatedComponents = makeAnimated();
  const [priority, setPriority] = useState([]);
  const [types, setType] = useState([]);
  const [associated, setAssociated] = useState([]);
  const [assignedUser, setAssignedUser] = useState([]);

  const selectType = (type) => {
    setType(type);
  };
  const selectPriority = (prio) => {
    setPriority(prio);
  };
  const selectAssociated = (assoc) => {
    setAssociated(assoc);
  };
  const selectMulti = (assign) => {
    setAssignedUser(assign);
  };

  const schema = yup.object().shape({
    title: yup.string().required('Title is required *'),
    type: yup.string(),
    priority: yup.string(),
    associated: yup.string(),
    assignedTo: yup.string(),
    dueDate: yup.string().required('Date is required *'),
    time: yup.string(),
    description: yup.string(),
  });
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    reset(editTask);
  }, []);

  const { token } = useSelector((state) => state.adminAuth);
  const onSubmit = async (data) => {
    try {
      console.log(data);
      console.log('errors');
      const taskId = editTask._id;
      const response = await taskService.editTaskAdmin(token, data, taskId);
      if (response) {
        setOpenPopup(false);
        getAllTasks();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p style={{ fontSize: '15px', color: 'red' }}>{errors.title?.message}</p>

      <TextField
        id="outlined-basic"
        fullWidth
        className="outlined-basic1"
        label="Title *"
        variant="outlined"
        name="title"
        {...register('title')}
      />
      <InputLabel
        id="demo-simple-select-autowidth-label"
        style={{ marginLeft: '10px', marginTop: '10px' }}
      >
        Type
      </InputLabel>
      <Select
        className="basic-single"
        defaultValue={{ label: editTask.priority, value: 0 }}
        value={types}
        onChange={selectType}
        options={taskType}
      />

      <InputLabel
        id="demo-simple-select-autowidth-label"
        style={{ marginLeft: '10px', marginTop: '10px' }}
      >
        Priority
      </InputLabel>
      <Select
        className="basic-single"
        value={priority}
        defaultValue={test[0]}
        onChange={selectPriority}
        options={priorityy}
      />

      <InputLabel
        id="demo-simple-select-autowidth-label"
        style={{ marginLeft: '10px', marginTop: '10px' }}
      >
        Associated with
      </InputLabel>
      <Select
        className="basic-single"
        value={associated}
        onChange={selectAssociated}
        options={allContacts}
        defaultValue={{ label: 'vishnu', value: 'vishnu' }}
      />

      <InputLabel
        id="demo-simple-select-autowidth-label"
        style={{ marginLeft: '10px', marginTop: '10px' }}
      >
        Assigned to
      </InputLabel>
      <Select
        isMulti
        value={assignedUser}
        components={animatedComponents}
        onChange={selectMulti}
        options={users}
        defaultValue={{ label: 2002, value: 2002 }}
      />

      <InputLabel
        id="demo-simple-select-autowidth-label"
        style={{ marginLeft: '10px', marginTop: '10px' }}
      >
        Due Date
      </InputLabel>
      <TextField
        id="outlined-basic"
        className="outlined-basic"
        variant="outlined"
        type="date"
        name="dueDate"
        defaultValue={editTask.due_date}
        {...register('dueDate')}
      />
      <TextField
        id="outlined-basic"
        className="outlined-basic"
        label="Time"
        type="time"
        variant="outlined"
        name="time"
        {...register('time')}
      />
      <TextField
        sx={{ height: '86px', marginTop: '10px' }}
        name="description"
        fullWidth
        id="outlined-basic"
        className="note"
        label="Note *"
        variant="outlined"
        {...register('description')}
      />

      <Button
        sx={{ float: 'right', marginRight: '50px', marginBottom: '50px' }}
        type="submit"
        variant="outlined"
      >
        <UpgradeSharpIcon />
        Update
      </Button>
    </form>
  );
}

export default EditTaskForm;
