import React from 'react';
import '@testing-library/jest-dom';
import { screen, cleanup, fireEvent } from '@testing-library/react';
import renderWithProviders from '../../helpers/renderWithProviders';
import OrderBook from '../OrderBook';

describe('OrderBook', () => {
  afterEach(cleanup);

  it('should display bids and asks correctly', () => {
    renderWithProviders(<OrderBook />, {
      initialState: {
        ticker: {
          data: {
            lastPrice: 0,
          },
        },
        book: {
          asks: {
            10311: {
              price: 10311,
              count: 6,
              amount: '-2.275',
              total: '-13.649',
            },
            10312: {
              price: 10312,
              count: 3,
              amount: '-2.375',
              total: '-13.849',
            },
          },
          bids: {
            10311: {
              price: 10311,
              count: 6,
              amount: '-2.275',
              total: '-13.649',
            },
            10312: {
              price: 10312,
              count: 3,
              amount: '-2.375',
              total: '-13.849',
            },
          },
        },
      },
    });

    expect(screen.getAllByTestId('ask-price')[0].textContent).toBe(
      '$10,311.00'
    );
    expect(screen.getAllByTestId('ask-count')[0].textContent).toBe('6');
    expect(screen.getAllByTestId('ask-amount')[0].textContent).toBe('-2.275');
    expect(screen.getAllByTestId('ask-total')[0].textContent).toBe('-13.649');

    expect(screen.getAllByTestId('ask-price')[1].textContent).toBe(
      '$10,312.00'
    );
    expect(screen.getAllByTestId('ask-count')[1].textContent).toBe('3');
    expect(screen.getAllByTestId('ask-amount')[1].textContent).toBe('-2.375');
    expect(screen.getAllByTestId('ask-total')[1].textContent).toBe('-13.849');

    expect(screen.getAllByTestId('bid-price')[0].textContent).toBe(
      '$10,312.00'
    );
    expect(screen.getAllByTestId('bid-count')[0].textContent).toBe('3');
    expect(screen.getAllByTestId('bid-amount')[0].textContent).toBe('-2.375');
    expect(screen.getAllByTestId('bid-total')[0].textContent).toBe('-13.849');

    expect(screen.getAllByTestId('bid-price')[1].textContent).toBe(
      '$10,311.00'
    );
    expect(screen.getAllByTestId('bid-count')[1].textContent).toBe('6');
    expect(screen.getAllByTestId('bid-amount')[1].textContent).toBe('-2.275');
    expect(screen.getAllByTestId('bid-total')[1].textContent).toBe('-13.649');
  });

  it('should be able to decrease precision correctly', () => {
    renderWithProviders(<OrderBook />, {
      initialState: {
        ticker: {
          data: {
            lastPrice: 0,
          },
        },
        book: {
          asks: {
            10311: {
              price: 10311,
              count: 6,
              amount: '-2.275',
              total: '-13.649',
            },
            10312: {
              price: 10312,
              count: 3,
              amount: '-2.375',
              total: '-13.849',
            },
          },
          bids: {
            10311: {
              price: 10311,
              count: 6,
              amount: '-2.275',
              total: '-13.649',
            },
            10312: {
              price: 10312,
              count: 3,
              amount: '-2.375',
              total: '-13.849',
            },
          },
        },
      },
    });

    fireEvent.click(screen.getByTestId('decrease-precision'));

    expect(screen.getAllByTestId('ask-price')[0].textContent).toBe(
      '$10,310.00'
    );
    expect(screen.getAllByTestId('ask-count')[0].textContent).toBe('6');
    expect(screen.getAllByTestId('ask-amount')[0].textContent).toBe('-2.27');
    expect(screen.getAllByTestId('ask-total')[0].textContent).toBe('-13.65');

    expect(screen.getAllByTestId('ask-price')[1].textContent).toBe(
      '$10,310.00'
    );
    expect(screen.getAllByTestId('ask-count')[1].textContent).toBe('3');
    expect(screen.getAllByTestId('ask-amount')[1].textContent).toBe('-2.38');
    expect(screen.getAllByTestId('ask-total')[1].textContent).toBe('-13.85');

    expect(screen.getAllByTestId('bid-price')[0].textContent).toBe(
      '$10,310.00'
    );
    expect(screen.getAllByTestId('bid-count')[0].textContent).toBe('3');
    expect(screen.getAllByTestId('bid-amount')[0].textContent).toBe('-2.38');
    expect(screen.getAllByTestId('bid-total')[0].textContent).toBe('-13.85');

    expect(screen.getAllByTestId('bid-price')[1].textContent).toBe(
      '$10,310.00'
    );
    expect(screen.getAllByTestId('bid-count')[1].textContent).toBe('6');
    expect(screen.getAllByTestId('bid-amount')[1].textContent).toBe('-2.27');
    expect(screen.getAllByTestId('bid-total')[1].textContent).toBe('-13.65');
  });

  it('should be able to increase bar depth correctly', () => {
    renderWithProviders(<OrderBook />, {
      initialState: {
        ticker: {
          data: {
            lastPrice: 10290,
          },
        },
        book: {
          asks: {
            10311: {
              price: 10311,
              count: 6,
              amount: '-2.275',
              total: '-13.649',
            },
            10312: {
              price: 10312,
              count: 3,
              amount: '-2.375',
              total: '-13.849',
            },
          },
          bids: {
            10311: {
              price: 10311,
              count: 6,
              amount: '-2.275',
              total: '-13.649',
            },
            10312: {
              price: 10312,
              count: 3,
              amount: '-2.375',
              total: '-13.849',
            },
          },
        },
      },
    });

    expect(
      screen.getAllByTestId('ask-bar')[0].getAttribute('data-teststate')
    ).toBe('21');

    fireEvent.click(screen.getByTestId('increase-bardepth'));

    expect(
      screen.getAllByTestId('ask-bar')[0].getAttribute('data-teststate')
    ).toBe('42');

    fireEvent.click(screen.getByTestId('increase-bardepth'));

    expect(
      screen.getAllByTestId('ask-bar')[0].getAttribute('data-teststate')
    ).toBe('63');
  });
});
