import { createSlice } from "@reduxjs/toolkit";
import { syncPlayerData } from "./playerSlice";

const initialState = {
  questionModal: false,
  feedbackModal: false,
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
});

export default uiSlice;
export const uiActions = uiSlice.actions;
