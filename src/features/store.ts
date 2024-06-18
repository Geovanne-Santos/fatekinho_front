import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authLogin';
import fatecoinReducer from './auth/fatecoins';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    fatecoin: fatecoinReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
