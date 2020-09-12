import {
  createSlice,
  createAsyncThunk,
  SerializedError,
} from '@reduxjs/toolkit';
import { FulfilledAction, RejectedAction } from '../types/actions';
import { APIConstants } from '../shared/constants';
import fetch from '../helpers/fetch';

interface Transaction {
  amount: number;
  date: string;
  id: number;
}

interface Bill {
  categoryId: number;
  iconUrl: string;
  id: string;
  isBill: boolean;
  name: string;
  transactions: Transaction[];
}

interface BillsState {
  data: Bill[];
  error: SerializedError | null;
}

const initialState: BillsState = {
  data: [],
  error: null,
};

export const billsRequest: any = createAsyncThunk('bills/billsRequest', () =>
  fetch(`${APIConstants.base}/bills`).then((resp) => resp.json())
);

export const addBillRequest: any = createAsyncThunk(
  'bills/addBillRequest',
  (bill: Bill) =>
    fetch(`${APIConstants.base}/bills/${bill.id}`, {
      method: 'PATCH',
      body: {
        ...bill,
        isBill: true,
      },
    }).then((resp) => resp.json())
);

export const removeBillRequest: any = createAsyncThunk(
  'bills/removeBillRequest',
  (bill: Bill) =>
    fetch(`${APIConstants.base}/bills/${bill.id}`, {
      method: 'PATCH',
      body: {
        ...bill,
        isBill: false,
      },
    }).then((resp) => resp.json())
);

const billsSlice = createSlice({
  name: 'bills',
  initialState,
  reducers: {},
  extraReducers: {
    [billsRequest.fulfilled]: (state, action: FulfilledAction<any, Bill[]>) => {
      state.data = action.payload;
    },
    [billsRequest.rejected]: (state, action: RejectedAction<any>) => {
      state.error = action.error;
    },
    [addBillRequest.fulfilled]: (state, action: FulfilledAction<any, Bill>) => {
      const billIndex = state.data.findIndex(
        (bill) => bill.id === action.payload.id
      );

      state.data[billIndex] = action.payload;
    },
    [addBillRequest.rejected]: (state, action: RejectedAction<any>) => {
      state.error = action.error;
    },
    [removeBillRequest.fulfilled]: (
      state,
      action: FulfilledAction<any, Bill>
    ) => {
      const billIndex = state.data.findIndex(
        (bill) => bill.id === action.payload.id
      );

      state.data[billIndex] = action.payload;
    },
    [removeBillRequest.rejected]: (state, action: RejectedAction<any>) => {
      state.error = action.error;
    },
  },
});

export default billsSlice;
