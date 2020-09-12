import { configureStore } from '@reduxjs/toolkit';
import socketSlice from './slices/socket';
import tickerSlice from './slices/ticker';
import bookSlice from './slices/book';
import tradesSlice from './slices/trades';

export const makeStore = (preloadedState = {}) =>
  configureStore({
    preloadedState,
    reducer: {
      socket: socketSlice.reducer,
      ticker: tickerSlice.reducer,
      book: bookSlice.reducer,
      trades: tradesSlice.reducer,
    },
  });

const store = makeStore();

export default store;
