import { render, screen } from '@testing-library/react';
import BodySectionWithMarginBottom from './BodySectionWithMarginBottom';

describe('BodySectionWithMarginBottom', () => {
  test('displays the title and the children', () => {
    render(
      <BodySectionWithMarginBottom title="Test title">
        <p>Test children</p>
      </BodySectionWithMarginBottom>
    );

    expect(screen.getByRole('heading', { name: 'Test title' })).toBeInTheDocument();
    expect(screen.getByText('Test children')).toBeInTheDocument();
  });
});
