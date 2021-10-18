import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { RootState } from './types';

interface User {
  login: string;
  email: string;
  avatar: string;
  id: string;
}

interface AppState {
  isAuthorized: boolean;
  user: User | null;
}

const initialState: AppState = {
  isAuthorized: false,
  user: null
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setIsAuthorized: (state, action: PayloadAction<boolean>)=> {
      state.isAuthorized = action.payload
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload
    }
  }
});

export const {actions: appActions, reducer: appReducer} = appSlice;

export const getIsAuthorized = (state: RootState):boolean => state.appReducer.isAuthorized;
export const getUser = (state: RootState): User | null => state.appReducer.user;
