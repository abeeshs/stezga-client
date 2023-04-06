import axios from 'axios';

export const searchUserService = async (search) => {
  try {
    const { token } = JSON.parse(localStorage.getItem('user'));
    const res = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/conversation/users?search=${search}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const createChatService = async (userId) => {
  try {
    const { token } = JSON.parse(localStorage.getItem('user'));
    const res = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/conversation/chat`,
      { userId },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getChatService = async () => {
  try {
    const { token } = JSON.parse(localStorage.getItem('user'));
    const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/conversation/chat`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getMessageService = async (chatId) => {
  try {
    const { token } = JSON.parse(localStorage.getItem('user'));
    const res = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/conversation/message/${chatId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const sendMessageService = async (messageData) => {
  try {
    const { token } = JSON.parse(localStorage.getItem('user'));
    const res = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/conversation/message`,
      messageData,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
