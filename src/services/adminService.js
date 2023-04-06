import axios from 'axios';
import { toast } from 'react-toastify';

export const adminLogout = async () => {
  try {
    localStorage.removeItem('admin-auth');
    return true;
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

export const getAdminDetails = async () => {
  try {
    const { token } = JSON.parse(localStorage.getItem('admin-auth'));
    const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/admin/admin-data`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data;
  } catch (err) {
    console.log(err);
  }
};
