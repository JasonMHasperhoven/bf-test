import { createSlice } from '@reduxjs/toolkit';
import camelcaseKeys from '../helpers/camelcaseKeys';

const initialState = {
  isSubscribed: false,
  chanId: null,
  data: {},
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

      state.data.dailyChange = state.data.dailyChange.toFixed(2);
      state.data.dailyChangeRelative = (
        state.data.dailyChangeRelative * 100
      ).toFixed(2);
    },
  },
});

export default tickerSlice;
