import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  otpEmail: null,
};

export const otpLoginSlice = createSlice({
  name: 'otplogin',
  initialState,
  reducers: {
    setUserEmail(state, action) {
      state.otpEmail = action.payload;
    },
  },
  deleteUserEmail(state) {
    state = null;
  },
});

export const { setUserEmail, deleteUserEmail } = otpLoginSlice.actions;

export default otpLoginSlice.reducer;
