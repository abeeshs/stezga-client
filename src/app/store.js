import { configureStore } from '@reduxjs/toolkit';
import adminAuthReducer from '../features/auth/adminAuthSlice';
import userAuthReducer from '../features/auth/userAuthSlice';
import userOTPReducer from '../features/auth/otpLoginSlice';
import adminMeetingReducer from '../features/meeting/meetingSlice';

export const store = configureStore({
  reducer: {
    adminAuth: adminAuthReducer,
    userAuth: userAuthReducer,
    userOTPLogin: userOTPReducer,
    newMeeting: adminMeetingReducer,
  },
});
