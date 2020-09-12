import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import socketSlice from './slices/socket';
import tickerSlice from './slices/ticker';

export const makeStore = (preloadedState = {}) =>
  configureStore({
    preloadedState,
    reducer: {
      socket: socketSlice.reducer,
      ticker: tickerSlice.reducer,
    },
    // middleware: getDefaultMiddleware({
    //   // thunk: {
    //   //   extraArgument: myCustomApiService,
    //   // },
    //   // https://redux-toolkit.js.org/api/serializabilityMiddleware
    //   // serializableCheck: {
    //   //   warnAfter: 100,
    //   // },
    //   // // https://redux-toolkit.js.org/api/immutabilityMiddleware
    //   // immutableCheck: {
    //   //   warnAfter: 100,
    //   // },
    //   // ignoredActions: 'socket/connect',
    // }),
  });

const store = makeStore();

export default store;
