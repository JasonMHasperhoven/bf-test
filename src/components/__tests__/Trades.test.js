import React from 'react';
import '@testing-library/jest-dom';
import { screen, cleanup } from '@testing-library/react';
import renderWithProviders from '../../helpers/renderWithProviders';
import Trades from '../Trades';

describe('Trades', () => {
  afterEach(cleanup);

  it('should display the details correctly', () => {
    renderWithProviders(<Trades />, {
      initialState: {
        trades: {
          data: {
            504071712: {
              id: 504071712,
              mts: 1599918904287,
              amount: '0.005',
              price: 10307,
            },
          },
        },
      },
    });

    expect(screen.getByTestId('trade-time').textContent).toBe('1:51:27');
    expect(screen.getByTestId('trade-price').textContent).toBe('10307');
    expect(screen.getByTestId('trade-amount').textContent).toBe('0.005');
  });
});
