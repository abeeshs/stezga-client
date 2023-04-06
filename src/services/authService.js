import axios from 'axios';
import { toast } from 'react-toastify';

// -----------------User SignUp Validation-------
export const userDataValidate = async (data) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/signup-validate`,
      data
    );
    return res.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
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

// ---------------Send email OTP for Signup-------
export const sendEmailOtp = async (data) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/signup/sent-otp`,
      data
    );
    return res.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
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

// ---------------- Varify Signup Email OTP-------

export const varifySignUpOtp = async (data) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/signup/verify-otp`,
      data
    );
    return res.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
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
// -----------------Admin register----------------

export const adminRegister = async (data) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/admin/signup`,
      data
    );

    return res.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
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

// -------------------------Admin login-----------------------

export const adminLogin = async (data) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/admin`,
      data
    );

    return res.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
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

// ----------------------------- User login ---------------------
export const userLogin = async (data) => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}`, data);
    console.log(res);
    return res.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
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

// -------------------------- User register ----------------------------

export const userRegister = async (data) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/signup`,
      data
    );

    return res.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
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

// -------------------------- User OTP Login ---------------------

export const userOtpLogin = async (data) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/otp-login`,
      data
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

// -------------------------- Verify OTP Login ---------------------

export const userVerifyOTP = async (otp, email) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/varify-otp`,
      { otp, email }
    );
    return res.data;
  } catch (err) {
    console.log(err.response.data);
    return err.response.data;
  }
};
// -------------------------- Logout User ---------------------

export const userLogout = async () => {
  try {
    localStorage.removeItem('user');
    return true;
  } catch (err) {
    console.log(err);
  }
};
