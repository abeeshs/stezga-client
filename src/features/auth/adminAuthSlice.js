import { createSlice } from '@reduxjs/toolkit';

// Get admin from localStorage
const adminAuth = JSON.parse(localStorage.getItem('admin-auth'));
const initialState = {
  admin: adminAuth ? adminAuth.admin : null,
  token: adminAuth ? adminAuth.token : null,
};

// Register admin
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAdminToken(state, action) {
      const { token, admin } = action.payload;
      localStorage.setItem(
        'admin-auth',
        JSON.stringify({
          token,
          admin,
        }),
      );
      state = { token, admin };
    },
    deleteAdminToken(state) {
      state = { admin: null, token: null };
      localStorage.removeItem('adminAuth');
    },
  },
});
export const { deleteAdminToken, setAdminToken } = authSlice.actions;
export default authSlice.reducer;
