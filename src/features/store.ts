import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authLogin';
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
