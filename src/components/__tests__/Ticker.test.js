import React from 'react';
import '@testing-library/jest-dom';
import { screen, cleanup } from '@testing-library/react';
import renderWithProviders from '../../helpers/renderWithProviders';
import Ticker from '../Ticker';

describe('Ticker', () => {
  afterEach(cleanup);

  it('should display the details correctly', () => {
    renderWithProviders(<Ticker />, {
      initialState: {
        ticker: {
          data: {
            bid: 10307,
            bidSize: 115.25824573,
            ask: 10308,
            askSize: 87.94186128,
            dailyChange: '24.91',
            dailyChangeRelative: '0.24',
            lastPrice: 10307.91176698,
            volume: 1571.34838081,
            high: 10438,
            low: 10266.28844424,
          },
        },
      },
    });

    expect(screen.getByTestId('volume').textContent).toBe('VOL $1,571.35');
    expect(screen.getByTestId('low').textContent).toBe('LOW $10,266.29');
    expect(screen.getByTestId('last-price').textContent).toBe('$10,307.91');
    expect(screen.getByTestId('daily-change').textContent).toBe(
      '24.91 (0.24%)'
    );
    expect(screen.getByTestId('high').textContent).toBe('HIGH $10,438.00');
  });
});
