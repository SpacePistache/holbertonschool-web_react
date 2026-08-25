import { render, screen } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  test('renders the login paragraph', () => {
    render(<App />);
    const el = screen.getByText(/login to access the full dashboard/i);
    expect(el).toBeInTheDocument();
  });

  test('renders the copyright footer', () => {
    render(<App />);
    const el = screen.getByText(/copyright \d{4} - holberton school/i);
    expect(el).toBeInTheDocument();
  });

  test('renders the h1 title', () => {
    render(<App />);
    const el = screen.getByRole('heading', { level: 1, name: /school dashboard/i });
    expect(el).toBeInTheDocument();
  });

  test('renders the logo image', () => {
    render(<App />);
    const el = screen.getByAltText(/holberton logo/i);
    expect(el).toBeInTheDocument();
  });
});
