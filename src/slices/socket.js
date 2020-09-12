import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as webSocketService from '../services/websocket';
import tickerSlice from './ticker';
import bookSlice from './book';

export const connect = createAsyncThunk(
  'socket/connect',
  (_, { getState, dispatch }) =>
    webSocketService.connect().then(({ onopenEvent, socket }) => {
      webSocketService.subscribeTicker();
      webSocketService.subscribeBook();

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        // console.log('socket.onmessage -> data', data);

        if (data.event === 'subscribed' && data.channel === 'ticker') {
          dispatch(tickerSlice.actions.subscribed(data));
        }

        if (data.event === 'subscribed' && data.channel === 'book') {
          dispatch(bookSlice.actions.subscribed(data));
        }

        if (Array.isArray(data)) {
          const rootState = getState();
          const [chanId, payload] = data;

          if (chanId === rootState.ticker.chanId && payload !== 'hb') {
            dispatch(tickerSlice.actions.receiveMessage(payload));
          }

          if (chanId === rootState.book.chanId && payload !== 'hb') {
            dispatch(
              bookSlice.actions.receiveMessage({ data: payload, rootState })
            );
          }
        }
      };

      return onopenEvent.data;
    })
);

export const disconnect = createAsyncThunk('socket/disconnect', () =>
  webSocketService.disconnect()
);

const initialState = {
  isConnected: false,
  isConnecting: false,
  isDisconnecting: false,
};

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {},
  extraReducers: {
    [connect.pending]: (state) => {
      state.isConnecting = true;
    },
    [connect.fulfilled]: (state, action) => {
      state.isConnected = true;
      state.isConnecting = false;
    },
    [disconnect.pending]: (state) => {
      state.isDisconnecting = true;
    },
    [disconnect.fulfilled]: (state) => {
      state.isConnected = false;
      state.isDisconnecting = false;
    },
  },
});

export default socketSlice;
