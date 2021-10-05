import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const initialState = {
  id: null,
  openid: "",
  hashid: "",
  nickname: "",
  avatar: null,
  headimgurl:
    "https://res.cloudinary.com/npc2021/image/upload/v1633443295/default_profile_image_3109ee6c17.jpg",
  shopurl: "",
  score1: 0,
  score2: 0,
  score3: 0,
  score4: 0,
  scoreTotal: 0,
  currentLevel: 0,
  life: 3,
  lastCertificateDate: null,
  certificates: [],
};

// TODO?
// const fetchPlayerData = createAsyncThunk();

export const syncPlayerData = createAsyncThunk(
  "player/syncPlayerData",
  async (dataToBeUpdated, thunkAPI) => {
    const hashid = localStorage.getItem("NUTRILON_PLAYER");
    const { id } = thunkAPI.getState().player;
    const res = await axios.put("/api/updatePlayerInfo", {
      hashid,
      id,
      update: dataToBeUpdated,
    });
    return res.data;
  }
);

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    login: (state, action) => {
      localStorage.setItem("NUTRILON_PLAYER", action.payload);
    },
    logout: (state) => {
      localStorage.removeItem("NUTRILON_PLAYER");
      state = initialState;
    },
    replacePlayerInfo: (state, action) => {
      state = Object.assign(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(syncPlayerData.pending, (state, action) => {
      console.log(`trying to update player ${state.nickname}...`);
    });
    builder.addCase(syncPlayerData.fulfilled, (state, action) => {
      state = action.payload;
      console.log(`player ${state.nickname} updated!`);
    });
    builder.addCase(syncPlayerData.rejected, (state, action) => {
      console.log(`player ${state.nickname} cannot be updated!`);
    });
  },
});

export default playerSlice;
export const playerActions = playerSlice.actions;

const verifyPayload = (payload) => {
  if (typeof payload !== "object") return false;
  const payloadKeys = Object.keys(payload);
  const validKeys = payloadKeys.filter((key) => key in initialState);
  return validKeys.length !== payloadKeys.length ? false : true;
};
