import { Alert, Button, Grid, InputLabel, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import './MeetingForm.css';
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

const types = [
  { label: 'Low', value: 'Low' },
  { label: 'Medium', value: 'Medium' },
  { label: 'High', value: 'High' },
];
function MeetingForm({ users, setOpenPopup, getMeetings }) {
  const animatedComponents = makeAnimated();
  const [start, setStart] = useState(dayjs(new Date()).add(1, 'hour'));
  const [end, setNewEnd] = useState(dayjs(new Date()).add(1, 'hour'));
  const [value, setValue] = useState('');
  const [type, setType] = useState({ label: 'Medium', value: 'Medium' });
  const [participands, setParticipands] = useState('');
  const [error, setError] = useState('');

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

  const onSubmit = async (data) => {
    try {
      if (dayjs(start) > dayjs(end)) {
        return setError('Select a valid date');
      }
      if (!participands || participands.length < 1) {
        console.log('participands error');
        return setError('Please select participands');
      }
      setError('');
      const newMeetingData = {
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

      const response = await meetingService.createNewMeeting(newMeetingData);
      if (response.status === 'Success') {
        getMeetings();
        setOpenPopup(false);
        toast.success('Meeting created sussessfully !');
      }
    } catch (err) {
      console.log(err);
    }
  };
  const selectType = (typeupdate) => {
    setType(typeupdate);
  };

  const selectMulti = (participand) => {
    setParticipands(participand);
  };

  return (
    <Box style={{ display: 'flex', width: '100%' }}>
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
                  defaultValue={dayjs(new Date())}
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
                  defaultValue={dayjs(new Date())}
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
                value={participands}
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
                value={type}
                defaultValue={type}
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
                value={value}
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
    </Box>
  );
}

export default MeetingForm;
