import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';
import { makeStore } from '../store';
import theme from '../constants/theme';

export default function renderWithProviders(children, config = {}) {
  return render(
    <Provider store={makeStore(config.initialState)}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </Provider>
  );
}
