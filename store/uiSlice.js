import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  questionModal: false,
  feedbackModal: false,
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
  },
});

export default uiSlice;
export const uiActions = uiSlice.actions;
