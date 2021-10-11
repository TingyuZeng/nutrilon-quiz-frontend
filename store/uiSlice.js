import { createSlice } from "@reduxjs/toolkit";
import { syncPlayerData } from "./playerSlice";

const initialState = {
  questionModal: false,
  feedbackModal: false,
  syncModal: false,
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
  },
});

export default uiSlice;
export const uiActions = uiSlice.actions;
