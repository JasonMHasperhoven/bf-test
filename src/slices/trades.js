import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSubscribed: false,
  chanId: null,
  data: {},
};

const tradesSlice = createSlice({
  name: 'trades',
  initialState,
  reducers: {
    subscribed: (state, action) => {
      state.isSubscribed = true;
      state.chanId = action.payload.chanId;
    },
    receiveMessage: (state, action) => {
      state.data = action.payload.reduce(
        (trades, [ID, MTS, AMOUNT, PRICE]) => ({
          ...trades,
          [ID]: {
            id: ID,
            mts: MTS,
            amount: AMOUNT.toFixed(3),
            price: Math.round(PRICE),
          },
        }),
        {}
      );
    },
  },
});

export default tradesSlice;
