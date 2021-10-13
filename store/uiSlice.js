import { createSlice } from "@reduxjs/toolkit";
import { syncPlayerData } from "./playerSlice";

const initialState = {
  questionModal: false,
  feedbackModal: false,
  syncModal: false,
  notificationModal: false,
  notificationText: "",
  notificationQRCode: true,
  notificationHandler: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    showQuestion: (state) => {
      state.questionModal = true;
    },
    hideQuestion: (state) => {
      state.questionModal = false;
    },
    showFeedback: (state) => {
      state.feedbackModal = true;
    },
    hideFeedback: (state) => {
      state.feedbackModal = false;
    },
    showSync: (state) => {
      state.syncModal = true;
    },
    hideSync: (state) => {
      state.syncModal = false;
    },
    showNotification: (state, action) => {
      const { text, qrcode, handler } = action.payload;
      state.notificationText = text;
      state.notificationQRCode = !!qrcode;
      state.notificationHandler = handler || null;
      state.notificationModal = true;
    },
    hideNotification: (state) => {
      state.notificationModal = false;
      state.notificationText = "";
      state.notificationQRCode = true;
      state.notificationHandler = null;
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(
  //     syncPlayerData.pending,
  //     (state) => (state.syncModal = true)
  //   );
  //   builder.addCase(
  //     syncPlayerData.rejected,
  //     (state) => (state.syncModal = false)
  //   );
  //   builder.addCase(
  //     syncPlayerData.fulfilled,
  //     (state) => (state.syncModal = false)
  //   );
  // },
});

export default uiSlice;
export const uiActions = uiSlice.actions;
