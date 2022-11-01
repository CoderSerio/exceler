import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../index';
import { AllFiles, OneFile } from './types';

// 由于可以上传多个文件，所以这里要用数组，即文件集合
const initialState: AllFiles = [];

export const fileDataSlice = createSlice({
  name: 'fileData',
  initialState,
  reducers: {
    addFile: (state: AllFiles, action: { payload: OneFile } ) => {
      console.log('收到了数据', action.payload)
      state.push(action.payload);
    },
    deleteFile: (state: AllFiles) => {
      // 在全局数据中移除这个东西
      console.log('删除数据,开发中', state);
    },
    updateColField: () => {
      // TODO: params: 1.来自哪个文件 2.新的内容
    },
    updateRowData: () => {
      // TODO: params: 1.来自哪个文件 2.该行数据的唯一标示 3.新的内容

    }
  },
})

export const { addFile, deleteFile } = fileDataSlice.actions;
export const selectFileState = ( state: RootState ) => state.fileData;
export default fileDataSlice.reducer;
// 先做成同步，如果有必要再考虑异步
// export const asyncAddFile = createAsyncThunk<Array<FileData>>(
//   'asyncAddFile',
//   () => {

//   }
// )
