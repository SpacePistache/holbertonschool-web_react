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
    const el = screen.getByText(/copyright \d{4} holberton school main dashboard/i);
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

    test('renders 2 input elements', () => {
    render(<App />);
    const inputs = screen.getAllByLabelText(/email|password/i);
    expect(inputs).toHaveLength(2);
  });

  test('renders 2 label elements with Email and Password', () => {
    render(<App />);
    const emailLabel = screen.getByText(/^email/i);
    expect(emailLabel).toBeInTheDocument();
  });

  test('renders a button with the text OK', () => {
    render(<App />);
    const button = screen.getByRole('button', { name: /ok/i });
    expect(button).toBeInTheDocument();
  });
});
