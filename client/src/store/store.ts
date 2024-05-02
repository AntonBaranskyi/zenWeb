import { configureStore } from '@reduxjs/toolkit';
import user from './slices/userSlice';
import deals from './slices/dealSlice';

export const store = configureStore({
  reducer: { user, deals },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
