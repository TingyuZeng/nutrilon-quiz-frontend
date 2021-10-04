import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const questions = [];

for (let i = 0; i < 10; i += 1) {
  questions[i] = {
    question: "",
    feedback: "",
    answers: { A: "", B: "", C: "", D: "" },
    correctAnswer: "",
    media: {},
  };
}

export const initialState = {
  level: 0,
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
    score: (state, action) => {
      const { start, end } = action.payload;
      // TODO: calculate the difference and give a score (full 10)
    },
  },
});

export default questionSlice;
