import { configureStore } from "@reduxjs/toolkit";
import playerSlice from "./playerSlice";
import gameSlice from "./gameSlice";

const store = configureStore({
  reducer: {
    player: playerSlice.reducer,
    game: gameSlice.reducer,
  },
});

export default store;
