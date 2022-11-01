import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../index';

// 模拟异步
import { asyncTestFunc } from 'utils/test';
import { TestState } from './types';

const initialState: TestState = {
  value: 0,
};

export const incrementAsync = createAsyncThunk<number>(
  'incrementAsync',
  asyncTestFunc
)

export const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    increment: (state: TestState) => {
      console.log(state.value)
      state.value += 1;
    },
    decrement: (state: TestState) => {
      state.value -= 1;
    }
  },
  extraReducers(builder) {
    // payload可以理解为异步resolve后（进入fulfilled状态）得到的结果
    builder.addCase(incrementAsync.fulfilled, (state, { payload }) => {
      state.value += payload;
    })
  }
});


export const { increment, decrement } = testSlice.actions;
// 用来get数据的（响应式）
export const selectTest = (state: RootState) => state.test.value;
export default testSlice.reducer;
