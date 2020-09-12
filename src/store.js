import { configureStore } from '@reduxjs/toolkit';
import socketSlice from './slices/socket';

export const makeStore = (preloadedState = {}) =>
  configureStore({
    preloadedState,
    reducer: {
      socket: socketSlice.reducer,
    },
  });

const store = makeStore();

export default store;
