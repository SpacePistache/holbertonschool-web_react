import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Login from './Login';
import rootReducer from '../../app/rootReducer';

const renderWithStore = () => {
  const store = configureStore({ reducer: rootReducer });
  render(
    <Provider store={store}>
      <Login />
    </Provider>
  );
  return store;
};

describe('Login', () => {
  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('displays the login form with email, password and submit button', () => {
    renderWithStore();

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /ok/i })).toBeDisabled();
  });

  test('sets isLoggedIn to true when submitted with valid credentials', async () => {
    const user = userEvent.setup();
    const store = renderWithStore();

    await user.type(screen.getByLabelText(/email/i), 'user@example.com');
    await user.type(screen.getByLabelText(/password/i), 'password123');
    await user.click(screen.getByRole('button', { name: /ok/i }));

    expect(store.getState().auth.isLoggedIn).toBe(true);
    expect(store.getState().auth.user.email).toBe('user@example.com');
  });

  test('keeps isLoggedIn false when submitted with invalid credentials', async () => {
    const user = userEvent.setup();
    const store = renderWithStore();

    await user.type(screen.getByLabelText(/email/i), 'not-an-email');
    await user.type(screen.getByLabelText(/password/i), '123');
    await user.click(screen.getByRole('button', { name: /ok/i }));

    expect(screen.getByRole('button', { name: /ok/i })).toBeDisabled();
    expect(store.getState().auth.isLoggedIn).toBe(false);
  });
});
