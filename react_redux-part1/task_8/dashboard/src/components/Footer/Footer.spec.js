import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Footer from './Footer';
import rootReducer from '../../app/rootReducer';

const renderWithStore = (isLoggedIn) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: {
      auth: { user: { email: '', password: '' }, isLoggedIn },
    },
  });
  render(
    <Provider store={store}>
      <Footer />
    </Provider>
  );
};

describe('Footer', () => {
  test('displays the copyright text', () => {
    renderWithStore(false);

    expect(
      screen.getByText(`Copyright ${new Date().getFullYear()} - Holberton School`)
    ).toBeInTheDocument();
  });

  test('displays the "Contact us" link when isLoggedIn is true', () => {
    renderWithStore(true);

    expect(screen.getByRole('link', { name: 'Contact us' })).toBeInTheDocument();
  });

  test('does not display the "Contact us" link when isLoggedIn is false', () => {
    renderWithStore(false);

    expect(screen.queryByRole('link', { name: 'Contact us' })).not.toBeInTheDocument();
  });
});
