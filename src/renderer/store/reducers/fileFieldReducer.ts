import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../index';
import { AllFiles } from './types';

const initialState: AllFiles = [];

export const fileDataSlice = createSlice({
  name: 'fileData',
  initialState,
  reducers: {
    addFile: (state: AllFiles, action ) => {
      state.push(action.payload);
    },
    setFile: (state: AllFiles) => {
      console.log('修改数据,开发中', state);
    },
    deleteFile: (state: AllFiles) => {
      console.log('删除数据,开发中', state);
    }
  },
})

export const { addFile, setFile, deleteFile } = fileDataSlice.actions;
export const selectFileState = ( state: RootState ) => state.fileData;
export default fileDataSlice.reducer;
// 先做成同步，如果有必要再考虑异步
// export const asyncAddFile = createAsyncThunk<Array<FileData>>(
//   'asyncAddFile',
//   () => {

//   }
// )
