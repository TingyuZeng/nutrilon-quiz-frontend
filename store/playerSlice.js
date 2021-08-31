import { createSlice } from "@reduxjs/toolkit";

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
  currentLevel: 1,
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
      // Verify the payload is valid
      const validPayload = Object.keys(action.payload)
        .filter((key) => key in initialState)
        .reduce((obj, key) => {
          obj[key] = action.payload[key];
          return obj;
        }, {});

      const isValid = validPayload.length === initialState.length;
      if (!isValid) {
        console.log("Cannot sync the player info");
        return;
      }

      state = Object.assign(state, action.payload);
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
