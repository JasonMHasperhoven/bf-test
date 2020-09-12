import React from 'react';
import '@testing-library/jest-dom';
import { screen, cleanup, fireEvent } from '@testing-library/react';
import renderWithProviders from '../../helpers/renderWithProviders';
import OrderBook from '../OrderBook';
// import * as OrderBookSlice from '../../slices/OrderBook';

describe('OrderBook', () => {
  afterEach(cleanup);

  // it('should display the loader when there’s no data', () => {
  //   renderWithProviders(<OrderBook />);

  //   expect(screen.getByTestId('loader')).toBeInTheDocument();
  // });

  it('should dispatch an action to add a bill when we are viewing potential OrderBook', () => {
    // OrderBookSlice.addBillRequest = jest.fn().mockImplementation(() => () => {});

    renderWithProviders(<OrderBook />, {
      initialState: {
        OrderBook: {
          data: [
            {
              name: 'bill1',
              id: 1,
              transactions: [1, 2],
              isBill: false,
            },
            {
              name: 'bill2',
              id: 2,
              transactions: [1, 2, 3, 4],
              isBill: false,
            },
          ],
        },
      },
    });

    // fireEvent.click(screen.getByTestId('bill-0-button'));

    // expect(OrderBookSlice.addBillRequest).toHaveBeenCalledWith({
    //   name: 'bill1',
    //   id: 1,
    //   transactions: [1, 2],
    //   isBill: false,
    // });
  });
});
