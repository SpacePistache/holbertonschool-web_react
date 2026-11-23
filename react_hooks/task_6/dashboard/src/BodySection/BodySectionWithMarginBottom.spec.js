import { render, screen } from '@testing-library/react';
import BodySectionWithMarginBottom from './BodySectionWithMarginBottom';

describe('BodySectionWithMarginBottom', () => {
  test('contains a div with the class bodySectionWithMargin', () => {
    const { container } = render(
      <BodySectionWithMarginBottom title="test">
        <p>child</p>
      </BodySectionWithMarginBottom>
    );
    expect(container.querySelector('.bodySectionWithMargin')).toBeInTheDocument();
  });

  test('renders the BodySection component', () => {
    const { container } = render(
      <BodySectionWithMarginBottom title="test">
        <p>child</p>
      </BodySectionWithMarginBottom>
    );
    expect(container.querySelector('.bodySectionWithMargin .bodySection')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'test' })).toBeInTheDocument();
    expect(screen.getByText('child')).toBeInTheDocument();
  });
});
