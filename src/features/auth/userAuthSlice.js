import { createSlice } from '@reduxjs/toolkit';

// Get user from localStorage
const userToken = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user: userToken ? userToken.user : null,
  token: userToken ? userToken.token : null,
};

// Register admin

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserToken(state, action) {
      const { token, user } = action.payload;
      // state = { token, user };
      state.token = token;
      state.user = user;
      localStorage.setItem(
        'user',
        JSON.stringify({
          token,
          user,
        }),
      );
    },
    deleteUserToken(state) {
      state = { user: null, token: null };
      localStorage.removeItem('user');
    },
  },
});
export const { deleteUserToken, setUserToken } = authSlice.actions;

export default authSlice.reducer;
