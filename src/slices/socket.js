import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as webSocketService from '../services/websocket';
import tickerSlice from './ticker';
import bookSlice from './book';
import tradesSlice from './trades';

export const connect = createAsyncThunk(
  'socket/connect',
  (_, { getState, dispatch }) =>
    webSocketService.connect().then(({ onopenEvent, socket }) => {
      webSocketService.subscribeTicker();
      webSocketService.subscribeBook();
      webSocketService.subscribeTrades();

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);

        if (data.event === 'subscribed' && data.channel === 'ticker') {
          dispatch(tickerSlice.actions.subscribed(data));
        }

        if (data.event === 'subscribed' && data.channel === 'book') {
          dispatch(bookSlice.actions.subscribed(data));
        }

        if (data.event === 'subscribed' && data.channel === 'trades') {
          dispatch(tradesSlice.actions.subscribed(data));
        }

        if (Array.isArray(data)) {
          const rootState = getState();
          const [chanId, payload] = data;

          if (['hb', 'te', 'tu'].includes(payload)) {
            return;
          }

          if (chanId === rootState.ticker.chanId) {
            dispatch(tickerSlice.actions.receiveMessage(payload));
          }

          if (chanId === rootState.book.chanId) {
            dispatch(bookSlice.actions.receiveMessage(payload));
          }

          if (chanId === rootState.trades.chanId) {
            dispatch(tradesSlice.actions.receiveMessage(payload));
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
    [connect.fulfilled]: (state) => {
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
