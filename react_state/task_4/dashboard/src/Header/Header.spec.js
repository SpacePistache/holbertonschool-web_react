import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';
import newContext from '../Context/context';

describe('Header component', () => {
  
  test('renders the Holberton logo', () => {
    render(<Header />);
    const logo = screen.getByAltText(/holberton logo/i);
    expect(logo).toBeInTheDocument();
  });

  test('renders the h1 with the correct text', () => {
    render(<Header />);
    const heading = screen.getByRole('heading', { level: 1, name: /school dashboard/i });
    expect(heading).toBeInTheDocument();
  });

  test('does not render logoutSection with the default context', () => {
    const { container } = render(<Header />);
    expect(container.querySelector('#logoutSection')).not.toBeInTheDocument();
  });

  test('renders logoutSection when the user is logged in', () => {
    const value = {
      user: { email: 'test@example.com', password: 'password123', isLoggedIn: true },
      logOut: () => {},
    };
    const { container } = render(
      <newContext.Provider value={value}>
        <Header />
      </newContext.Provider>
    );

    const section = container.querySelector('#logoutSection');
    expect(section).toBeInTheDocument();
    expect(section).toHaveTextContent(/welcome test@example.com/i);
  });

  test('clicking logout calls logOut from the context', () => {
    const logOut = jest.fn();
    const value = {
      user: { email: 'test@example.com', password: 'password123', isLoggedIn: true },
      logOut,
    };
    render(
      <newContext.Provider value={value}>
        <Header />
      </newContext.Provider>
    );

    fireEvent.click(screen.getByText(/logout/i));
    expect(logOut).toHaveBeenCalledTimes(1);
  });

});
