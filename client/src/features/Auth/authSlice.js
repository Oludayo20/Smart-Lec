import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../app/api/axios';

let token;

const initialState = {
  token: token ? token : null,
  isUninitialized: false,
  teachers: [],
  isSuccess: false,
  isLoading: false,
  message: '',
  isError: false
};

console.log(token);

export const register = createAsyncThunk(
  'staff/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/staff/register', userData);
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

export const login = createAsyncThunk(
  'staff/login',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/staff/login', userData);
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

export const refresh = createAsyncThunk(
  'staff/refresh',
  async (rejectWithValue) => {
    try {
      const response = await axios.post('/staff/refresh');
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

export const getAllTeacher = createAsyncThunk(
  'staff/getAllTeacher',
  async (rejectWithValue) => {
    try {
      const response = await axios.get('staff/getAllTeacher');
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

export const logout = createAsyncThunk('auth/logout', async () => {
  const response = await axios.post('/auth/logout');
  console.log(response);
  return response.data;
});

const authSlice = createSlice({
  name: 'auth',
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
    [register.pending]: (state) => {
      state.isLoading = true;
    },
    [register.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload;
    },
    [register.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      // state.token = null;
    },

    [login.pending]: (state) => {
      state.isLoading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.token = action.payload;
    },
    [login.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      state.token = null;
    },
    [refresh.pending]: (state) => {
      state.isLoading = true;
    },
    [refresh.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isUninitialized = true;
      state.token = action.payload;
    },
    [refresh.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      state.token = null;
    },
    [getAllTeacher.pending]: (reset, state) => {
      // state.isLoading = true;
    },
    [getAllTeacher.fulfilled]: (state, action) => {
      // state.isLoading = false;
      // state.isSuccess = true;
      state.teachers = action.payload;
    },
    [getAllTeacher.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      state.teachers = null;
    },
    [logout.fulfilled]: (state) => {
      state.isSuccess = true;
      state.token = null;
    }
  }
});

export const { reset } = authSlice.actions;

export const status = (state) => state.auth;

export default authSlice.reducer;
