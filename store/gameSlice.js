import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import hashCode from "../lib/hashCode";
import { syncPlayerData } from "./playerSlice";

const MAX_TIME = 30 * 1000;
const MAX_SCORE = 10;
const MIN_SCORE = 5;

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
  questionList: {
    level: 0,
    levelInfo: "",
    isActive: false,
    openDate: "",
    questions,
  },
  answerList: {
    correctAnswers: Array(10).fill(""),
    playerAnswers: Array(10).fill(""),
    scores: Array(10).fill(0),
    isAnswered: Array(10).fill(false),
    isCorrect: Array(10).fill(false),
  },
  currentQuestion: 0,
};

export const getCurrentLevelQuestions = createAsyncThunk(
  "question/getCurrentLevelQuestions",
  async (_, thunkAPI) => {
    const { currentLevel } = thunkAPI.getState().player;
    const res = await axios.get("/api/getQuestions", {
      params: { level: currentLevel },
    });
    return res.data;
  }
);

export const uploadCurrentLevelScores = createAsyncThunk(
  "question/uploadCurrentLevelScores",
  async (_, thunkAPI) => {
    const { game, player } = thunkAPI.getState();
    const { questionList, answerList, currentQuestion } = game;
    if (currentQuestion !== 10) throw "Game not finished!";

    const currentLevelTotalScore = answerList.scores.reducer(
      (prev, curr) => prev + curr,
      0
    );
    if (currentLevelTotalScore > 100 || currentLevelTotalScore < 0)
      throw "Invalid level score!";

    const { scoreTotal } = player;
    const newScoreTotal = scoreTotal + currentLevelTotalScore;
    if (newScoreTotal > 400 || newScoreTotal < 0) throw "Invalid total score!";

    const levelIndex = questionList.level;
    const update = {};
    update["scoreTotal"] = newScoreTotal;
    update[`score${levelIndex + 1}`] = currentLevelTotalScore;

    const dispatch = thunkAPI.dispatch();
    return await dispatch(syncPlayerData(update));
  }
);

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    scoreCurrentQuestion: (state, action) => {
      const { start, end, answer } = action.payload;
      if (!answer) return;

      const index = state.currentQuestion;
      state.answerList.playerAnswers[index] = answer;
      state.answerList.isAnswered[index] = true;

      const isCurrentCorrect =
        hashCode(answer) === state.answerList.correctAnswers[index];
      state.answerList.isCorrect[index] = isCurrentCorrect;
      state.answerList.scores[index] = isCurrentCorrect
        ? Math.round(
            (Math.abs(end - start) / MAX_TIME) * (MAX_SCORE - MIN_SCORE)
          )
        : 0;

      // when currentQuestion === 10, it means the player finishes the game
      if (index < 10) state.currentQuestion++;
    },
    resetGame: (state) => (state = initialState),
  },
  extraReducers: (builder) => {
    builder.addCase(getCurrentLevelQuestions.fulfilled, (state, action) => {
      state.questionList = action.payload;
      const questions = action.payload.questions;
      state.answerList.correctAnswers = questions.map(
        ({ correctAnswer }) => correctAnswer
      );
    });

    //TODO: UI SLICE IF API FAILED
  },
});

export default gameSlice;
export const gameActions = gameSlice.actions;
