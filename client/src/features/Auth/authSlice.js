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

console.log(token);

export const register = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/auth/register', userData);
      console.log(response.data);
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
  'auth/login',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/auth/login', userData);
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
      state.token = null;
    },
    [login.pending]: (state) => {
      state.isLoading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.token = action.payload;
      state.isSuccess = true;
      state.isLoading = false;
    },
    [login.rejected]: (state, action) => {
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

export const { reset } = authSlice.actions;

export const status = (state) => state.auth;

export default authSlice.reducer;
