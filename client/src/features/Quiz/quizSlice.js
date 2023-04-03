import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../app/api/axios';

let quiz;

const initialState = {
  quiz: quiz ? quiz : null,
  isSuccess: false,
  isLoading: false,
  message: '',
  isError: false
};

console.log(quiz);

export const createQuiz = createAsyncThunk(
  'quiz/createQuiz',
  async (quizData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/quiz/createQuiz', quizData);
      console.log(response.data);
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return rejectWithValue(message);
    }
  }
);

export const getQuizzes = createAsyncThunk(
  'quiz/getQuizzes',
  async ({ rejectWithValue }) => {
    try {
      const response = await axios.post('/quiz/getQuizzes');
      console.log(response.data);
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return rejectWithValue(message);
    }
  }
);

export const deleteQuiz = createAsyncThunk(
  'quiz/deleteQuiz',
  async (id, { rejectWithValue }) => {
    try {
      console.log(id);
      const response = await axios.delete('/quiz/deleteQuiz', id);
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return rejectWithValue(message);
    }
  }
);

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    }
  },
  extraReducers: {
    [createQuiz.pending]: (state) => {
      state.isLoading = true;
    },
    [createQuiz.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload.message;
      state.quiz = action.payload.quiz;
    },
    [createQuiz.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      state.quiz = null;
    },
    [getQuizzes.pending]: (state) => {
      state.isLoading = true;
    },
    [getQuizzes.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.quiz = action.payload;
    },
    [getQuizzes.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      state.quiz = null;
    },
    [deleteQuiz.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteQuiz.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload;
    },
    [deleteQuiz.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      state.quiz = null;
    }
  }
});

export const { reset } = quizSlice.actions;

export const status = (state) => state.quiz;

export default quizSlice.reducer;
