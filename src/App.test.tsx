// src/App.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from '@store';
import { ThemeProvider } from '@theme/ThemeContext';

// Подавляем сообщения об act(...) и роутинговые warning’и
;beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
  jest.spyOn(console, 'warn').mockImplementation(() => {});
});

;afterAll(() => {
  (console.error as jest.Mock).mockRestore();
  (console.warn as jest.Mock).mockRestore();
});

function renderApp(initialEntries: string[]) {
  return render(
    <Provider store={store}>
      <ThemeProvider>
        <MemoryRouter initialEntries={initialEntries}>
          <App />
        </MemoryRouter>
      </ThemeProvider>
    </Provider>
  );
}

describe('App smoke routing', () => {
  it.each([
    ['/'],
    ['/pokemon/bulbasaur'],
    ['/no-such-route'],
  ])('renders header logo on %s', (route) => {
    renderApp([route]);
    expect(
      screen.getByRole('img', { name: /pokédex logo/i })
    ).toBeInTheDocument();
  });
});