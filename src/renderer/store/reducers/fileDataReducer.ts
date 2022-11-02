import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../index';
import { AllFiles, OneFile, ColField } from './types';

// 由于可以上传多个文件，所以这里要用数组，即文件集合
const initialState: AllFiles = [];


export const fileDataSlice = createSlice({
  name: 'fileData',
  initialState,
  reducers: {
    addFile: (state: AllFiles, action: { payload: OneFile } ) => {
      state.push(action.payload);
    },
    deleteFile: (state: AllFiles) => {
      // 在全局数据中移除这个东西
      console.log('删除数据,开发中', state);
    },
    updateColField: (state: AllFiles, action: { payload: Array<ColField> }) => {
      // 这一组改动一定来自于同一个文件，并且保证有至少一个元素
      const fileName = action?.payload?.[0]?.from;
      state.forEach((oneFile: OneFile, index) => {
        if (oneFile.id === fileName) {
          // 考虑新增字段、修改字段等情况，
          // 并且表头字段较少所以采用直接新开辟内存的方式
          state[index].allColFields = [...action.payload];
        }
      })
    },
    updateRowData: (state: AllFiles, action) => {


    },
    modifyFileData: (state: AllFiles, action: { payload: string }) => {
    }
  },
})

export const { addFile, deleteFile, updateColField, updateRowData } = fileDataSlice.actions;
export const selectFileState = ( state: RootState ) => state.fileData;
export default fileDataSlice.reducer;``
// 先做成同步，如果有必要再考虑异步
// export const asyncAddFile = createAsyncThunk<Array<FileData>>(
//   'asyncAddFile',
//   () => {

//   }
// )
