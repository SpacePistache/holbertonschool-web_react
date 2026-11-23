import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';

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

  test('does not render logoutSection when no user is passed', () => {
    const { container } = render(<Header />);
    expect(container.querySelector('#logoutSection')).not.toBeInTheDocument();
  });

  test('renders logoutSection when the user is logged in', () => {
    const user = { email: 'test@example.com', password: 'password123', isLoggedIn: true };
    const { container } = render(<Header user={user} logOut={() => {}} />);

    const section = container.querySelector('#logoutSection');
    expect(section).toBeInTheDocument();
    expect(section).toHaveTextContent(/welcome test@example.com/i);
  });

  test('clicking logout calls the logOut prop', () => {
    const logOut = jest.fn();
    const user = { email: 'test@example.com', password: 'password123', isLoggedIn: true };
    render(<Header user={user} logOut={logOut} />);

    fireEvent.click(screen.getByText(/logout/i));
    expect(logOut).toHaveBeenCalledTimes(1);
  });

});
