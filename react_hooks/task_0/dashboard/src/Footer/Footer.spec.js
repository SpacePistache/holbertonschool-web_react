import { render, screen } from '@testing-library/react';
import Footer from './Footer';
import { getCurrentYear, getFooterCopy } from '../utils/utils';
import newContext from '../Context/context';

describe('Footer component', () => {
  
  test('renders the copyright paragraph', () => {
    render(<Footer />);
    const text = screen.getByText(`Copyright ${getCurrentYear()} - ${getFooterCopy(false)}`);
    expect(text).toBeInTheDocument();
  });

  test('does not show "Contact us" when the user is logged out', () => {
    render(<Footer />);
    expect(screen.queryByText(/contact us/i)).not.toBeInTheDocument();
  });

  test('shows "Contact us" when the user is logged in', () => {
  const value = {
    user: { email: 'test@example.com', password: 'password123', isLoggedIn: true },
    logOut: () => {},
  };
  render(
    <newContext.Provider value={value}>
      <Footer />
    </newContext.Provider>
    );
    expect(screen.getByRole('link', { name: /contact us/i })).toBeInTheDocument();
  });
});
