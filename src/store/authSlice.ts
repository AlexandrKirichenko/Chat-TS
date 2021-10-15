import {createSlice} from '@reduxjs/toolkit';

interface authSlice {
  initialState: boolean;
}

const authSlice = createSlice({
  name: 'autorization',
  initialState,
  reducers: {
    setAutorized() {},
  }
});

export const { actions, reducer } =  authSlice;
