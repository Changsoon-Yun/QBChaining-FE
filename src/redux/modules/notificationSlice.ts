import { createSlice } from "@reduxjs/toolkit";
import {
  getNotificationDB,
  postNotificationDB,
  delNotificationDB,
} from "../async/notification";

export const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    isFetching: false,
    notification: [],
  },
  reducers: {},
  extraReducers: {
    /**
     *알림 조회
     */
    [getNotificationDB.pending.type]: state => {
      state.isFetching = true;
    },
    [getNotificationDB.fulfilled.type]: (state, action) => {
      if (action.payload === undefined) {
        state.notification = [];
        return;
      }
      state.notification = action.payload;
    },

    /**
     * 알림 확인
     */
    [postNotificationDB.pending.type]: (state, action) => {
      state.isFetching = true;
    },
    [postNotificationDB.fulfilled.type]: (state, action) => {
      const idx = state.notification.findIndex(data => {
        return data.notiId === action.payload;
      });
      state.notification[idx].check = true;
    },

    /**
     * 알림 삭제
     */
    [delNotificationDB.pending.type]: state => {
      state.isFetching = true;
    },
    [delNotificationDB.fulfilled.type]: (state, action) => {
      const deleteList = state.notification.filter(data => {
        return data.notiId !== action.payload;
      });
      state.notification = deleteList;
    },
  },
});

export const {} = notificationSlice.actions;
export default notificationSlice.reducer;
