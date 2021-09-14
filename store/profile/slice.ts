/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IUser, Settings } from '../../types';
import { IProfileStore } from '../../types/redux';

const initialState: IProfileStore = {
  user: null,
  token: '',
  settings: {
    startOfWork: '07:30',
    workingHours: '06:00',
  },
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    loadUser(
      state: IProfileStore,
      action: PayloadAction<{
        token: string;
        user: IUser;
      }>
    ) {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    loadSettings(state: IProfileStore, action: PayloadAction<Settings>) {
      state.settings = action.payload;
    },
    clear(state: IProfileStore) {
      state.user = null;
      state.token = '';
      state.settings = {
        startOfWork: '07:30',
        workingHours: '06:00',
      };
    },
  },
});

export const { actions } = profileSlice;
export default profileSlice.reducer;
