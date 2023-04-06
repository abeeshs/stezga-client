import axios from 'axios';
import { toast } from 'react-toastify';

// --------------- View all users for - admin ---------------

export const getAllUser = async () => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/admin/users`,
    );
    return res.data;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message)
      || error.message
      || error.toString();
    toast(message, {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });
    return message;
  }
};

// --------------- View users -for users ----------------

export const viwAllusers = async (token) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message)
      || error.message
      || error.toString();
    toast(message, {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });
  }
};

// --------------- Block User ---------------

export const blockUsers = async (userId, status) => {
  try {
    const res = await axios.patch(
      `${process.env.REACT_APP_SERVER_URL}/admin/Users/block-user/${userId}`,
      { status },
    );
    return res.data;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message)
      || error.message
      || error.toString();
    toast(message, {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });
  }
};

// --------------- Delete users ---------------

export const deleteUser = async (token, userId) => {
  try {
    const res = await axios.delete(
      `${process.env.REACT_APP_SERVER_URL}/admin/Users/delete-user/${userId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return res.data;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message)
      || error.message
      || error.toString();
    toast(message, {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });
  }
};
// --------------- User logout service ---------------

export const userLogOut = async () => {
  try {
    const token = JSON.parse(localStorage.getItem('user'));
    if (token) {
      localStorage.removeItem('user');
      return true;
    }
    return false;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message)
      || error.message
      || error.toString();
    toast(message, {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });
  }
};

export const getUserService = async (token) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message)
      || error.message
      || error.toString();
    toast(message, {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });
  }
};

export const editProfileService = async (data) => {
  const { token } = JSON.parse(localStorage.getItem('user'));
  try {
    const res = await axios.put(
      `${process.env.REACT_APP_SERVER_URL}/profile/edit-profile`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return res.data;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message)
      || error.message
      || error.toString();
    toast(message, {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });
  }
};

// Get users data without owner details
export const viwAllCompanyUsers = async () => {
  const userToken = JSON.parse(localStorage.getItem('user'));
  const token = userToken?.token;
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/users/all-users`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return res.data;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message)
      || error.message
      || error.toString();
    toast(message, {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });
  }
};

// Sending email invitaion to new users along with login link

export const inviteNewUser = async (email) => {
  const userToken = JSON.parse(localStorage.getItem('user'));
  const token = userToken?.token;
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/users/add-user`,
      { email },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return res.data;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message)
      || error.message
      || error.toString();
    toast(message, {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });
  }
};

// Verifying new user and creating new account
export const allowNewUserService = async (data) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/users/user-login`,
      data,
    );
    return res.data;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message)
      || error.message
      || error.toString();
    toast(message, {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });
  }
};
