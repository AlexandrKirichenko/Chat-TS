import { configureStore } from '@reduxjs/toolkit';
import autorizationStatus from '../features/counter/counterSlice';

export default configureStore({
  reducer: {
    auth: autorizationStatus,
  },
});
