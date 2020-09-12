import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const connect = createAsyncThunk(
  'socket/connect',
  () =>
    new Promise((resolve) => {
      const socket = new WebSocket('wss://api-pub.bitfinex.com/ws/2');
      socket.onopen = () => resolve(socket);
    })
);

export const disconnect = createAsyncThunk(
  'socket/disconnect',
  (_, { getState }) =>
    new Promise((resolve) => {
      const socket = getState().socket.instance;
      socket.close();
      socket.onclose = () => resolve();
    })
);

const initialState = {
  instance: null,
  isConnected: false,
};

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {},
  extraReducers: {
    [connect.fulfilled]: (state, action) => {
      state.instance = action.payload;
      state.isConnected = true;
    },
    [disconnect.fulfilled]: (state) => {
      state.instance = null;
      state.isConnected = false;
    },
  },
});

export default socketSlice;
