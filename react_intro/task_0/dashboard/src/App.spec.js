import { render, screen } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  test('renders the h1 with the dashboard title', () => {
    render(<App />);
    // getByRole with name = one query for both the element type and its text
    expect(screen.getByRole('heading', { level: 1, name: /school dashboard/i })).toBeInTheDocument();
  });

  test('renders the body and footer paragraphs', () => {
    render(<App />);
    expect(screen.getByText(/login to access the full dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/copyright/i)).toBeInTheDocument();
    expect(screen.getByText(/holberton school/i)).toBeInTheDocument();
  });

  test('renders the logo image', () => {
    render(<App />);
    expect(screen.getByAltText(/holberton logo/i)).toBeInTheDocument();
  });
});
