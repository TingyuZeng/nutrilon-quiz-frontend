import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const questions = [];

for (let i = 0; i < 10; i += 1) {
  questions[i] = {
    id: i + 1,
    question: "",
    feedback: "",
    answerA: "",
    answerB: "",
    answerC: "",
    answerD: "",
    correctAnswer: "",
    media: {},
  };
}

export const initialState = {
  id: 0,
  levelInfo: "",
  isActive: false,
  openDate: "",
  questions,
};

const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    get: (state, action) => {
      console.log(action);
      const level = action.payload;
      axios
        .get("/api/getQuestions", { params: { level } })
        .then((res) => {
          state = res.data;
        })
        .catch((error) => {
          console.error(error);
        });
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

export default questionSlice;
