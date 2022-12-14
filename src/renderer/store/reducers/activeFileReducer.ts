import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../index';
import { ActiveFileState } from './types';

const initialState: ActiveFileState = {
  id: '',
  index: 0,
  lastModify: 'never',
};

export const activeFileSlice = createSlice({
  name: 'activeFile',
  initialState,
  reducers: {
    updateActiveFileIndex: (state: ActiveFileState, action: { payload: ActiveFileState }) => {
      state.id = action.payload.id;
      state.index = action.payload.index;
    },
    modifyActiveFile: (state: ActiveFileState, action: { payload: string }) => {
      state.lastModify = action.payload;
    }
  },
});

export const { updateActiveFileIndex, modifyActiveFile } = activeFileSlice.actions;
export const select = (state: RootState) => state.activeFile;
export default activeFileSlice.reducer;
