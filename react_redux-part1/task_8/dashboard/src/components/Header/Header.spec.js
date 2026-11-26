import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Header from './Header';
import rootReducer from '../../app/rootReducer';
import { login } from '../../features/auth/authSlice';

const renderWithStore = (store) => {
  render(
    <Provider store={store}>
      <Header />
    </Provider>
  );
};

describe('Header', () => {
  test('displays the logout link when isLoggedIn is true', () => {
    const store = configureStore({
      reducer: rootReducer,
      preloadedState: {
        auth: { user: { email: 'user@example.com', password: 'password123' }, isLoggedIn: true },
      },
    });
    renderWithStore(store);

    expect(screen.getByText('(logout)')).toBeInTheDocument();
  });

  test('displays a welcome message with the email after login', () => {
    const store = configureStore({ reducer: rootReducer });
    store.dispatch(login({ email: 'user@example.com', password: 'password123' }));
    const { container } = render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    expect(container.querySelector('#logoutSection')).toHaveTextContent(
      'Welcome user@example.com'
    );
  });

  test('sets isLoggedIn to false when the logout link is clicked', () => {
    const store = configureStore({ reducer: rootReducer });
    store.dispatch(login({ email: 'user@example.com', password: 'password123' }));
    renderWithStore(store);

    fireEvent.click(screen.getByText('(logout)'));

    expect(store.getState().auth.isLoggedIn).toBe(false);
    expect(screen.queryByText('(logout)')).not.toBeInTheDocument();
  });
});
