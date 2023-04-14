import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/Auth/authSlice';
import quizReducer from '../features/Quiz/quizSlice';
import clsReducer from '../features/classes/clsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    quiz: quizReducer,
    cls: clsReducer
  }
});
