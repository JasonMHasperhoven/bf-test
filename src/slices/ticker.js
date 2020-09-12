import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import camelcaseKeys from '../helpers/camelcaseKeys';

const initialState = {
  isSubscribed: false,
  chanId: null,
};

const tickerSlice = createSlice({
  name: 'ticker',
  initialState,
  reducers: {
    subscribed: (state, action) => {
      console.log('action.payload', action.payload);
      state.isSubscribed = true;
      state.chanId = action.payload.chanId;
    },
    receiveMessage: (state, action) => {
      const [
        BID,
        BID_SIZE,
        ASK,
        ASK_SIZE,
        DAILY_CHANGE,
        DAILY_CHANGE_RELATIVE,
        LAST_PRICE,
        VOLUME,
        HIGH,
        LOW,
      ] = action.payload;

      state.data = camelcaseKeys({
        BID,
        BID_SIZE,
        ASK,
        ASK_SIZE,
        DAILY_CHANGE,
        DAILY_CHANGE_RELATIVE,
        LAST_PRICE,
        VOLUME,
        HIGH,
        LOW,
      });
    },
  },
  extraReducers: {
    // [connect.pending]: (state) => {
    //   state.isConnecting = true;
    // },
    receiveMessage: (state, action) => {
      console.log('action', action.payload);
      // state.isSubscribed = false;
      // state.chanId = action.payload.chanId;
    },
    // [disconnect.pending]: (state) => {
    //   state.isDisconnecting = true;
    // },
    // [disconnect.fulfilled]: (state) => {
    //   ticker = null;
    //   state.isConnected = false;
    //   state.isDisconnecting = false;
    // },
  },
});

export default tickerSlice;
