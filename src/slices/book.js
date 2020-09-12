import { createSlice } from '@reduxjs/toolkit';
import camelcaseKeys from '../helpers/camelcaseKeys';

const initialState = {
  isSubscribed: false,
  chanId: null,
  asks: {},
  bids: {},
};

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    subscribed: (state, action) => {
      state.isSubscribed = true;
      state.chanId = action.payload.chanId;
    },
    receiveMessage: (state, action) => {
      const [PRICE, COUNT, AMOUNT] = action.payload.data;

      const order = camelcaseKeys({
        PRICE,
        COUNT,
        AMOUNT,
      });

      if (order.amount > 0) {
        state.bids[order.price] = {
          ...order,
          amount: Number(order.amount).toFixed(3),
          total: Number(order.count * order.amount).toFixed(3),
        };
      }

      if (order.amount < 0) {
        state.asks[order.price] = {
          ...order,
          amount: Number(order.amount).toFixed(3),
          total: Number(order.count * order.amount).toFixed(3),
        };
      }
    },
  },
});

export default bookSlice;
