import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../index';
import { AllFiles, OneFile, ColField, RowData } from './types';

// 由于可以上传多个文件，所以这里要用数组，即文件集合
const initialState: AllFiles = [];

export const fileDataSlice = createSlice({
  name: 'fileData',
  initialState,
  reducers: {
    addFile: (state: AllFiles, action: { payload: OneFile }) => {
      state.push(action.payload);
    },
    deleteFile: (state: AllFiles) => {
      // 将文件从全局状态管理树上移除
      console.log('删除数据,开发中', state);
    },
    updateColField: (
      state: AllFiles,
      action: { payload: { index: number; data: Array<ColField> } }
    ) => {
      const { payload: { index, data } } = action;
      state[index].allColFields = [...data];
    },
    updateRowData: (
      state: AllFiles,
      action: { payload: { index: number; data: Array<RowData> } }
    ) => {
      const {
        payload: { index, data },
      } = action;
      state[index].allRows = [...data];
    },
    modifyFileData: (state: AllFiles, action: { payload: string }) => {},
  },
});

export const { addFile, deleteFile, updateColField, updateRowData } =
  fileDataSlice.actions;
export const selectFileState = (state: RootState) => state.fileData;
export default fileDataSlice.reducer;
``;
