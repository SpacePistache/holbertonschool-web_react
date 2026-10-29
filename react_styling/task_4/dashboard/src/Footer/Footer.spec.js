import { render, screen } from '@testing-library/react';
import Footer from './Footer';
import { getCurrentYear, getFooterCopy } from '../utils/utils';

describe('Footer component', () => {
  test('renders the copyright paragraph', () => {
    render(<Footer />);
    const text = screen.getByText(`Copyright ${getCurrentYear()} - ${getFooterCopy(false)}`);
    expect(text).toBeInTheDocument();
  });
});
