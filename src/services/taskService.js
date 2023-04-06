import axios from 'axios';
import { toast } from 'react-toastify';

// --------------- Get all task- admin ---------------

export const getAllTask = async () => {
  try {
    const adminToken = JSON.parse(localStorage.getItem('admin-auth'));
    const { token } = adminToken;
    const res = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/admin/task`,
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

// --------------- Create new Task ---------------

export const createTask = async (data) => {
  const userToken = JSON.parse(localStorage.getItem('user'));
  const { token } = userToken;
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/task/add-task`,
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

// --------------- All tasks for this user ---------------

export const getUserTask = async (token) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/task`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

// --------------- Change task status for user ---------------

export const completeTask = async (taskId) => {
  const { token } = JSON.parse(localStorage.getItem('user'));
  try {
    const res = await axios.put(
      `${process.env.REACT_APP_SERVER_URL}/task/complete-task/${taskId}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

// --------------- Edit task by admin ---------------

export const editTaskAdmin = async (token, data, taskId) => {
  try {
    const res = await axios.put(
      `${process.env.REACT_APP_SERVER_URL}/admin/task/edit-task/${taskId}`,
      { data },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

// --------------- Delete task by admin ---------------

export const deleteTaskAdmin = async (token, taskId) => {
  try {
    const res = await axios.delete(
      `${process.env.REACT_APP_SERVER_URL}/admin/task/delete-task/${taskId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

// --------------- Varify task ---------------

export const verifyTask = async (taskId) => {
  try {
    const { token } = JSON.parse(localStorage.getItem('user'));
    console.log(token);
    const res = await axios.put(
      `${process.env.REACT_APP_SERVER_URL}/task/task-verify/${taskId}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return res;
  } catch (err) {
    console.log(err);
  }
};

// --------------- Pending  task by user ---------------

export const getPendingTask = async (token) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/task/pending-task`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

// --------------- Compleated  task by user ---------------

export const completedTask = async (token) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/task/completed-task`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

// --------------- Upload task documents ---------------

export const uploadFile = async (data, taskId) => {
  const { token } = JSON.parse(localStorage.getItem('user'));
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/task/upload-file/${taskId}`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

// --------------- Get task documents ---------------

export const getTaskFile = async (filename) => {
  const { token } = JSON.parse(localStorage.getItem('user'));
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/download/${filename}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    console.log(res);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
