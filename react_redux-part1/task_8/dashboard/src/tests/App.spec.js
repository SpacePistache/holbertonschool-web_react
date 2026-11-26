import { render, screen, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import mockAxios from 'jest-mock-axios';
import App from '../App';
import rootReducer from '../app/rootReducer';

const notificationsData = [
  { id: 1, type: 'default', value: 'New course available' },
  { id: 2, type: 'urgent', value: 'New resume available' },
  { id: 3, type: 'urgent', html: { __html: '' } },
];

const renderWithStore = (preloadedState) => {
  const store = configureStore({ reducer: rootReducer, preloadedState });
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  return store;
};

describe('App', () => {
  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    mockAxios.reset();
    jest.restoreAllMocks();
  });

  test('displays the Login component when isLoggedIn is false', () => {
    renderWithStore({
      auth: { user: { email: '', password: '' }, isLoggedIn: false },
    });

    expect(screen.getByText('Login to access the full dashboard')).toBeInTheDocument();
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
  });

  test('displays the CourseList component when isLoggedIn is true', () => {
    renderWithStore({
      auth: { user: { email: 'user@example.com', password: 'password123' }, isLoggedIn: true },
    });

    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.queryByText('Login to access the full dashboard')).not.toBeInTheDocument();
  });

  test('fetches and displays the notifications on mount', async () => {
    renderWithStore();

    expect(mockAxios.get).toHaveBeenCalledWith('http://localhost:5173/notifications.json');

    await act(async () => {
      mockAxios.mockResponseFor(
        { url: 'http://localhost:5173/notifications.json' },
        { data: { notifications: notificationsData } }
      );
    });

    expect(screen.getByText('New course available')).toBeInTheDocument();
    expect(screen.getByText('New resume available')).toBeInTheDocument();
    expect(screen.getByText('Urgent requirement')).toBeInTheDocument();
  });
});
