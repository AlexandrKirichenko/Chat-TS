import { configureStore } from '@reduxjs/toolkit';
import { appReducer } from './appSlice';

export const store = configureStore({
  devTools: true,
  reducer: { appReducer },
});
