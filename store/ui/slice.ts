/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { IUIStore } from '../../types/redux';

const initialState: IUIStore = {
  loading: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    enableLoading(state: IUIStore) {
      state.loading = true;
    },
    disableLoading(state: IUIStore) {
      state.loading = false;
    },
  },
});

export const { actions } = uiSlice;
export default uiSlice.reducer;
