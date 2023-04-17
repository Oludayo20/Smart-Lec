import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../app/api/axios';

let allCls;

const initialState = {
  allCls: allCls ? allCls : null,
  cls: null,
  isSuccess: false,
  isLoading: false,
  message: '',
  isError: false
};

export const getCls = createAsyncThunk(
  'class/getCls',
  async (rejectWithValue) => {
    try {
      const response = await axios.get('class/getAllCls');
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return rejectWithValue(message);
    }
  }
);

export const createCls = createAsyncThunk(
  'class/create',
  async (clsData, { rejectWithValue }) => {
    try {
      const response = await axios.post('class/create', clsData);
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

export const getClsDetailsById = createAsyncThunk(
  'class/getClsDetailsById',
  async (classId, { rejectWithValue }) => {
    try {
      const response = await axios.post('class/getClsDetailsById', classId);
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

export const deleteCls = createAsyncThunk(
  'class/delete',
  async (id, { rejectWithValue }) => {
    try {
      console.log(id);
      const response = await axios.delete('class/delete', id);
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

const clsSlice = createSlice({
  name: 'cls',
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
    [createCls.pending]: (state) => {
      state.isLoading = true;
    },
    [createCls.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload.message;
      // state.allCls = action.payload.allCls;
    },
    [createCls.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      // state.allCls = null;
    },
    [getCls.pending]: (state) => {
      // state.isLoading = true;
    },
    [getCls.fulfilled]: (state, action) => {
      // state.isLoading = false;
      // state.isSuccess = true;
      state.allCls = action.payload;
    },
    [getCls.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      state.allCls = null;
    },
    [getClsDetailsById.pending]: (state) => {
      state.isLoading = true;
    },
    [getClsDetailsById.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.cls = action.payload;
    },
    [getClsDetailsById.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      state.cls = null;
    },
    [deleteCls.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteCls.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload;
    },
    [deleteCls.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      state.allCls = null;
    }
  }
});

export const { reset } = clsSlice.actions;

export const status = (state) => state.cls;

export default clsSlice.reducer;
