import { Alert, Button, Grid, InputLabel, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import toast, { Toaster } from 'react-hot-toast';
import * as meetingService from '../../../../services/meetingService';
import DatePick from '../../../Extra Components/DatePick/DatePick';

import * as userService from '../../../../services/userService';

const types = [
  { label: 'Low', value: 'Low' },
  { label: 'Medium', value: 'Medium' },
  { label: 'High', value: 'High' },
];

function EditMeeting({
  selectedMeeting,
  setOpenPopup,
  getMeetings,
  setSingleView,
}) {
  const part = selectedMeeting.participands.map((item) => ({
    value: item.memberId._id,
    label: item.member,
  }));
  console.log(part);
  const { token } = JSON.parse(localStorage.getItem('user'));
  const animatedComponents = makeAnimated();
  const [start, setStart] = useState(dayjs(selectedMeeting?.start_date));
  const [end, setNewEnd] = useState(dayjs(selectedMeeting?.end_date));
  const [value, setValue] = useState('');
  const [type, setType] = useState({
    value: selectedMeeting.type,
    value: selectedMeeting.type,
  });
  const [participands, setParticipands] = useState(part);
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);

  const schema = yup.object().shape({
    name: yup.string().required('Meeting name is required*'),
    participands: yup.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const getUsersList = async () => {
    try {
      const response = await userService.viwAllusers(token);

      if (response.status === 'Success') {
        const arrObj = response.users.map((item) => ({
          label: item.username,
          value: item._id,
        }));

        setUsers(arrObj);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getUsersList();
  }, []);

  const onSubmit = async (data) => {
    try {
      if (dayjs(start) > dayjs(end)) {
        return setError('Select a valid date');
      }
      if (!participands || participands.length < 1) {
        return setError('Please select participands');
      }
      setError('');
      const meetingData = {
        name: data.name,
        startDate: dayjs(start).format('MMMM D YYYY h:mm a'),
        endDate: dayjs(end).format('MMMM D YYYY h:mm a'),
        participands: participands.map((item) => ({
          memberId: item.value,
          member: item.label,
        })),
        type: type.value,
        description: value,
      };
      const response = await meetingService.updateMeeting(
        selectedMeeting._id,
        meetingData
      );
      if (response.status === 'Success') {
        setOpenPopup(false);
        setSingleView();
        getMeetings();

        toast.success('Meeting created sussessfully !');
      }
    } catch (err) {
      console.log(err);
    }
  };
  const selectType = (types) => {
    setType(types);
  };

  const selectMulti = (participands) => {
    setParticipands(participands);
  };
  return (
    <div style={{ display: 'flex', width: '100%' }}>
      <Toaster />
      <Box
        sx={{ width: '100%' }}
        className="model-form-body"
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        {error && <Alert severity="error">{error}</Alert>}
        <Grid container sx={{ width: '70%' }}>
          <Grid item sm={6}>
            <Box className="input-label-box" sx={{ marginBottom: '10px' }}>
              <InputLabel
                className="label-stl"
                size="small"
                variant="filled"
                required
              >
                Meeting Name
              </InputLabel>
            </Box>
          </Grid>
          <Grid item sm={6}>
            <Box className="input-input-box">
              <TextField
                id="outlined-size-small"
                fullWidth
                size="small"
                margin="normal"
                name="name"
                defaultValue={selectedMeeting.event_title}
                error={!!errors.name}
                helperText={errors.name ? errors.name.message : ''}
                {...register('name')}
              />
            </Box>
          </Grid>
          <Grid item sm={6}>
            <Box className="input-label-box">
              <InputLabel
                className="label-stl"
                size="small"
                variant="filled"
                required
              >
                Starting Date and time
              </InputLabel>
            </Box>
          </Grid>
          <Grid item sm={6}>
            <Box className="input-input-box">
              {/* <DatePick newDate={start} setNewDate={setStart} /> */}
              <DatePick>
                <DateTimePicker
                  disablePast
                  value={start}
                  onChange={(newValue) => setStart(newValue)}
                  sx={{
                    height: 40,
                    marginBottom: 2,
                    borderSpacing: 2,
                    paddingTop: 1,
                    paddingBottom: 5,

                    '& .MuiInputBase-root': {
                      height: 40,
                      marginBottom: 2,
                      borderSpacing: 2,
                    },
                  }}
                />
              </DatePick>
            </Box>
          </Grid>
          <Grid item sm={6}>
            <Box className="input-label-box">
              <InputLabel
                className="label-stl"
                size="small"
                variant="filled"
                required
              >
                End Date & time
              </InputLabel>
            </Box>
          </Grid>
          <Grid item sm={6}>
            <Box className="input-input-box">
              <DatePick>
                <DateTimePicker
                  disablePast
                  defaultValue={dayjs(new Date(selectedMeeting.end_date))}
                  value={end}
                  onChange={(newValue) => setNewEnd(newValue)}
                  sx={{
                    height: 40,
                    marginBottom: 2,
                    borderSpacing: 2,
                    paddingTop: 1,
                    paddingBottom: 5,

                    '& .MuiInputBase-root': {
                      height: 40,
                      marginBottom: 2,
                      borderSpacing: 2,
                    },
                  }}
                />
              </DatePick>
            </Box>
          </Grid>
          <Grid item sm={6}>
            <Box className="input-label-box">
              <InputLabel
                className="label-stl"
                size="small"
                color="success"
                variant="filled"
                required
              >
                Participands
              </InputLabel>
            </Box>
          </Grid>
          <Grid item sm={6}>
            <Box className="input-input-box">
              <Select
                isMulti
                defaultValue={part}
                name="participands"
                components={animatedComponents}
                onChange={selectMulti}
                options={users}
              />
            </Box>
          </Grid>
          <Grid item sm={6}>
            <Box className="input-label-box">
              <InputLabel
                className="label-stl"
                size="small"
                color="success"
                variant="filled"
                required
              >
                Type
              </InputLabel>
            </Box>
          </Grid>
          <Grid item sm={6}>
            <Box className="input-input-box">
              <Select
                size="small"
                className="basic-single"
                defaultValue={[
                  { value: selectedMeeting.type, value: selectedMeeting.type },
                ]}
                onChange={selectType}
                options={types}
                name="contactOwner"
              />
            </Box>
          </Grid>
          <Grid item sm={6}>
            <Box className="input-label-box">
              <InputLabel
                className="label-stl"
                size="small"
                color="success"
                variant="filled"
                required
              >
                Description
              </InputLabel>
            </Box>
          </Grid>
          <Grid item sm={6}>
            <Box
              className="input-input-box"
              sx={{ height: '180px', width: '500px', paddingTop: '20px' }}
            >
              <ReactQuill
                style={{ height: '100px' }}
                theme="snow"
                defaultValue={selectedMeeting.description}
                onChange={setValue}
              />
            </Box>
          </Grid>
          <Grid item sm={6}>
            <Box
              className="input-input-box"
              sx={{ width: '500px', paddingTop: '20px' }}
            />
          </Grid>
          <Grid item sm={6}>
            <Box
              className="input-input-box "
              sx={{ width: '500px', display: 'flex', justifyContent: 'end' }}
            >
              <Button
                type="submit"
                className="meeting-btn"
                sx={{ width: '100px' }}
                variant="contained"
              >
                Save
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default EditMeeting;
