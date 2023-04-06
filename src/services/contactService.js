import axios from 'axios';
import { toast } from 'react-toastify';

// ---------------Get All contacts -User -----------------------

export const getAllContact = async () => {
  const userToken = JSON.parse(localStorage.getItem('user'));
  const token = userToken?.token;

  try {
    const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/contacts`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data;
  } catch (error) {
    console.log(error);
    if (error.response.data.message === 'User Blocked') {
      localStorage.removeItem('user');
    }
    const message =			(error.response && error.response.data && error.response.data.message)
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

// ----------------------- Create contact -----------------------

export const createContact = async (data) => {
  try {
    const userToken = JSON.parse(localStorage.getItem('user'));
    const token = userToken?.token;
    const res = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/contacts/add-contact`,
      { data },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    return res.data;
  } catch (error) {
    console.log(error);

    const message = error.response && error.response.data && error.response.data.message;
    return message;
  }
};

// -----------------------Update contact -USER -----------------------

export const updateContact = async (data) => {
  try {
    const userToken = JSON.parse(localStorage.getItem('user'));
    const { token } = userToken;
    const res = await axios.put(
      `${process.env.REACT_APP_SERVER_URL}/contacts/edit-contact/${data._id}`,
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

// -----------------------Get All contact for admin -----------------------

export const getAllContactAdmin = async (token) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/admin/contacts`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data;
  } catch (error) {
    const message =			(error.response && error.response.data && error.response.data.message)
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

// -----------------------Delete contact by user-----------------------

export const deleteContact = async (id) => {
  try {
    const res = await axios.delete(
      `${process.env.REACT_APP_SERVER_URL}/contacts/delete-contact/${id}`,
    );

    return res.data;
  } catch (error) {
    const message =			(error.response && error.response.data && error.response.data.message)
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

export const adminCreateContact = async (data) => {
  const { token } = JSON.parse(localStorage.getItem('admin-auth'));
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/admin/contacts/add-contact`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return response.data;
  } catch (error) {
    const message =			(error.response && error.response.data && error.response.data.message)
			|| error.message
			|| error.toString();
    return message;
  }
};
