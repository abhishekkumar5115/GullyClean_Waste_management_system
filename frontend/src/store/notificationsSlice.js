import { createSlice, nanoid } from '@reduxjs/toolkit';

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: {
    list: [
      // example:
      // { id: '1', title: 'New Pickup Assigned', message: 'Pickup #23 assigned to you.', date: Date.now(), read: false }
    ],
  },
  reducers: {
    addNotification: {
      reducer(state, action) {
        state.list.unshift(action.payload);
      },
      prepare({ title, message }) {
        return {
          payload: {
            id: nanoid(),
            title,
            message,
            date: Date.now(),
            read: false,
          },
        };
      },
    },
    markRead(state, action) {
      const notif = state.list.find((n) => n.id === action.payload);
      if (notif) notif.read = true;
    },
    markAllRead(state) {
      state.list.forEach((n) => (n.read = true));
    },
    removeNotification(state, action) {
      state.list = state.list.filter((n) => n.id !== action.payload);
    },
  },
});

export const {
  addNotification,
  markRead,
  markAllRead,
  removeNotification,
} = notificationsSlice.actions;
export default notificationsSlice.reducer;
