import { render, screen } from '@testing-library/react';
import BodySection from './BodySection';

describe('BodySection', () => {
  test('displays the title and the children', () => {
    render(
      <BodySection title="Test title">
        <p>Test children</p>
      </BodySection>
    );

    expect(screen.getByRole('heading', { name: 'Test title' })).toBeInTheDocument();
    expect(screen.getByText('Test children')).toBeInTheDocument();
  });
});
