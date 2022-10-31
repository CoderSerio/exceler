import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../index';

// 单行数据
export interface RowData {
  [key: string]: string,
};

// 一个文件
export interface OneFile {
  id: string, // 文件名字
  data: Array<RowData>
}

// 所有文件
export type AllFiles = Array<OneFile>;

// 由于可以上传多个文件，所以这里要用数组，即文件集合
const initialState: AllFiles = [];

export const fileDataSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {
    addFile: (state: AllFiles, action ) => {
      console.log('拿到了数据', action.payload);
      // state.forEach((file: OneFile) => {
      //   initialState.push(file);
      // })
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
