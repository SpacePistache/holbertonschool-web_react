import { render, screen } from '@testing-library/react';
import NotificationItem from './NotificationItem';

describe('NotificationItem component', () => {
  test('renders a blue default item', () => {
    render(<NotificationItem type="default" value="test" />);
    const item = screen.getByRole('listitem');

    expect(item).toHaveStyle({ color: 'blue' });
    expect(item).toHaveAttribute('data-notification-type', 'default');
  });

  test('renders a red urgent item', () => {
    render(<NotificationItem type="urgent" value="test" />);
    const item = screen.getByRole('listitem');

    expect(item).toHaveStyle({ color: 'red' });
    expect(item).toHaveAttribute('data-notification-type', 'urgent');
  });
});
