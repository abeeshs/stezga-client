import axios from 'axios';

// ----------------------- Get all deals -----------------------

export const getAllDealService = async () => {
  try {
    const { token } = JSON.parse(localStorage.getItem('user'));
    const deals = await axios.get(`${process.env.REACT_APP_SERVER_URL}/deals`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return deals.data;
  } catch (err) {
    console.log(err);
  }
};

// ----------------------- Creating new deal -----------------------
export const createDeal = async (data) => {
  try {
    const { token } = JSON.parse(localStorage.getItem('user'));
    const result = await axios.post(`${process.env.REACT_APP_SERVER_URL}/deals/create-deal`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return result.data;
  } catch (error) {
    const message =			(error.response && error.response.data && error.response.data.message)
			|| error.message
			|| error.toString();

    return message;
  }
};

// ----------------------- Updating the deal -----------------------

export const updateDeal = async (data, id) => {
  try {
    const { token } = JSON.parse(localStorage.getItem('user'));
    const result = await axios.put(
      `${process.env.REACT_APP_SERVER_URL}/deals/update-deal/${id}`,
      { data },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return result;
  } catch (err) {
    console.log(err);
  }
};
