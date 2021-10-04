import { configureStore } from "@reduxjs/toolkit";
import playerSlice from "./playerSlice";
import questionSlice from "./questionSlice";

const store = configureStore({
  reducer: {
    player: playerSlice.reducer,
    question: questionSlice.reducer,
  },
});

export default store;

export const playerActions = playerSlice.actions;
export const questionActions = questionSlice.actions;
