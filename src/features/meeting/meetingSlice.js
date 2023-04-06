import { createSlice } from '@reduxjs/toolkit';

// Get user from localStorage

const initialState = {
  meetings: {},
};

export const adminMeetingSlice = createSlice({
  name: 'meetings',
  initialState,
  reducers: {
    setNewMeeting(state, action) {
      state.meetings = { ...state.meetings, ...action.payload };
    },

    deleteMeeting(state) {
      state = {
        organizer: null,
        eventTitle: null,
        location: null,
        location: null,
        description: null,
      };
    },
  },
});
export const { deleteMeeting, setNewMeeting } = adminMeetingSlice.actions;
export default adminMeetingSlice.reducer;
