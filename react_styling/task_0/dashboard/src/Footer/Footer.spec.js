import { render, screen } from '@testing-library/react';
import Footer from './Footer';
import { getCurrentYear } from '../utils/utils';

describe('Footer component', () => {
  test('renders the copyright paragraph', () => {
    render(<Footer />);
    const text = screen.getByText(`Copyright ${getCurrentYear()} - Holberton School`);
    expect(text).toBeInTheDocument();
  });
});
