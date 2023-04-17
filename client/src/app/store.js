import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/Auth/authSlice';
import quizReducer from '../features/Quiz/quizSlice';
import clsReducer from '../features/classes/clsSlice';
import studentAuthReducer from '../features/Student/studentAuthSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    studentAuth: studentAuthReducer,
    quiz: quizReducer,
    cls: clsReducer
  }
});
