import {createSlice} from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: {num: 0},
  reducers: {
    increment: (state, action) => {
      console.log('Increment reducer call', action.payload);
      state.num = action.payload + 1;
    },
    decrement: (state, action) => {
      state.num = action.payload - 1;
    },
  },
});

export const {increment, decrement} = counterSlice.actions;

export default counterSlice.reducer;
