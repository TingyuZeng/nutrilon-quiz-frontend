import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import hashCode from "../lib/hashCode";
import { syncPlayerData } from "./playerSlice";

const MAX_TIME = 15 * 1000;
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
    level: -1,
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
    isCorrect: Array(10).fill(null),
  },
  currentQuestionIndex: 0,
  currentLevelScore: 0,
  startTime: 0,
  endTime: 0,
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
    const { questionList, currentQuestionIndex, currentLevelScore } = game;
    if (currentQuestionIndex !== 10) throw "Game not finished!";

    if (currentLevelScore > 100 || currentLevelScore < 0)
      throw "Invalid level score!";

    const { scoreTotal, currentLevel } = player;
    const newLevel = currentLevel + 1;
    if (newLevel > 3) throw "Available levels not found!";
    const newScoreTotal = scoreTotal + currentLevelScore;
    if (newScoreTotal > 400 || newScoreTotal < 0) throw "Invalid total score!";

    const levelIndex = questionList.level;
    const update = {};
    update["scoreTotal"] = newScoreTotal;
    update[`score${levelIndex + 1}`] = currentLevelScore;
    update["currentLevel"] = newLevel;

    const dispatch = thunkAPI.dispatch();
    return await dispatch(syncPlayerData(update));
  }
);

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    scorecurrentQuestionIndex: (state, action) => {
      const answer = action.payload;
      if (!answer) return;

      state.endTime = Date.now();
      let time = state.endTime - state.startTime;
      if (time < 0) {
        state.startTime = null;
        state.endTime = null;
        return;
      } else if (time > MAX_TIME) time = MAX_TIME;

      const index = state.currentQuestionIndex;
      if (index > 9) return;

      state.answerList.playerAnswers[index] = answer;
      state.answerList.isAnswered[index] = true;

      const isCurrentCorrect =
        hashCode(answer) === state.answerList.correctAnswers[index];

      state.answerList.isCorrect[index] = isCurrentCorrect;
      const currentQuestionScore = isCurrentCorrect
        ? Math.ceil(MAX_SCORE - ((MAX_SCORE - MIN_SCORE) / MAX_TIME) * time)
        : 0;

      state.answerList.scores[index] = currentQuestionScore;
      state.currentLevelScore += currentQuestionScore;
    },
    goToNextQuestion: (state) => {
      // when currentQuestionIndex === 10, it means the player finishes the game
      if (state.currentQuestionIndex < 10) state.currentQuestionIndex++;
    },
    recordStartTime: (state) => {
      state.endTime = 0;
      state.startTime = Date.now();
    },
    resetStartTime: (state) => {
      state.startTime = 0;
      state.endTime = 0;
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
  },
});

export default gameSlice;
export const gameActions = gameSlice.actions;
