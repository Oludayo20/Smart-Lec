import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../app/api/axios';

let token;

const initialState = {
  token: token ? token : null,
  isSuccess: false,
  isLoading: false,
  message: '',
  isError: false
};

export const registerStudent = createAsyncThunk(
  'student/register',
  async (userData, { rejectWithValue }) => {
    console.log(userData);
    try {
      const response = await axios.post('/student/register', userData);
      return response.data.message;
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

export const loginStudent = createAsyncThunk(
  'student/login',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/student/login', userData);
      return response.data.accessToken;
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

export const logout = createAsyncThunk('auth/logout', async () => {
  const response = await axios.post('/auth/logout');
  console.log(response);
  return response.data;
});

const studentAuthSlice = createSlice({
  name: 'studentAuth',
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
    [registerStudent.pending]: (state) => {
      state.isLoading = true;
    },
    [registerStudent.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload;
    },
    [registerStudent.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    },
    [loginStudent.pending]: (state) => {
      state.isLoading = true;
    },
    [loginStudent.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.token = action.payload;
    },
    [loginStudent.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      state.token = null;
    },
    [logout.fulfilled]: (state) => {
      state.isSuccess = true;
      state.token = null;
    }
  }
});

export const { reset } = studentAuthSlice.actions;

export const status = (state) => state.studentAuth;

export default studentAuthSlice.reducer;
