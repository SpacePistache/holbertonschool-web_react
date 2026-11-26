import { render, screen } from '@testing-library/react';
import { StyleSheetTestUtils } from 'aphrodite';
import NotificationItem from './NotificationItem';

describe('NotificationItem', () => {
  test('displays a default notification in blue', () => {
    render(
      <NotificationItem id={1} type="default" value="New course available" markAsRead={() => {}} />
    );

    const item = screen.getByText('New course available');
    expect(item).toHaveAttribute('data-notification-type', 'default');
    expect(item.className).toMatch(/^default_/);
    expect(StyleSheetTestUtils.getBufferedStyles().join('')).toContain('color:blue');
  });

  test('displays an urgent notification in red', () => {
    render(
      <NotificationItem id={2} type="urgent" value="New resume available" markAsRead={() => {}} />
    );

    const item = screen.getByText('New resume available');
    expect(item).toHaveAttribute('data-notification-type', 'urgent');
    expect(item.className).toMatch(/^urgent_/);
    expect(StyleSheetTestUtils.getBufferedStyles().join('')).toContain('color:red');
  });
});
