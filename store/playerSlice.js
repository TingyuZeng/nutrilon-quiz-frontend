import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const initialState = {
  id: null,
  openid: "",
  hashid: "",
  nickname: "",
  avatar: null,
  headimgurl: "",
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
    sync: (state, action) => {
      state = Object.assign(state, action.payload);
    },
    upload: (state, action) => {
      // if (!verifyPayload(action.payload)) return;

      const hashid = localStorage.getItem("NUTRILON_PLAYER");
      axios
        .put("/api/updatePlayerInfo", {
          hashid,
          current: state,
          update: action.payload,
        })
        .then((res) => {
          state = res.data;
          console.log(`player ${state.nickname} updated!`);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    setAvatar: (state, action) => {
      // TODO: log error
      if (![0, 1, 2].includes(action.payload)) return;
      state.avatar = action.payload;
    },
    setScoreLevel: (state, action) => {
      const level = state.currentLevel - 1;
      const score = action.payload;

      // TODO: log error
      if (score > 100) return;

      const scores = ["score1", "score2", "score3", "score4"];
      state[scores[level]] = score;
    },
  },
});

export default playerSlice;

const verifyPayload = (payload) => {
  if (typeof payload !== "object") return false;
  const payloadKeys = Object.keys(payload);
  const validKeys = payloadKeys.filter((key) => key in initialState);
  return validKeys.length !== payloadKeys.length ? false : true;
};
