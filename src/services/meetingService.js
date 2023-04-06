import axios from 'axios';

// --------------- Get the details of the user who has meeting---------

export const getMemberToInvite = async () => {
  try {
    const { token } = JSON.parse(localStorage.getItem('admin-auth'));
    await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/admin/meetings/members`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
  } catch (err) {
    console.log(err);
  }
};

/// /--------------- Get the meeting details ---------------

export const getMeetings = async () => {
  const { token } = JSON.parse(localStorage.getItem('user'));
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/meetings`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const createNewMeeting = async (data) => {
  const { token } = JSON.parse(localStorage.getItem('user'));
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/meetings/create-meeting`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteMeeting = async (meetingId) => {
  const { token } = JSON.parse(localStorage.getItem('user'));
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_SERVER_URL}/meetings/delete-meeting/${meetingId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const updateMeeting = async (meetingId, meeting) => {
  const { token } = JSON.parse(localStorage.getItem('user'));
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_SERVER_URL}/meetings/update-meeting/${meetingId}`,
      meeting,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
