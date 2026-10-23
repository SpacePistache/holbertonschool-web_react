import { render, screen, fireEvent } from '@testing-library/react';
import Notifications from './Notifications';

const notifications = [
  { id: 1, type: 'default', value: 'New course available' },
  { id: 2, type: 'urgent', value: 'New resume available' },
  { id: 3, type: 'urgent', value: 'Urgent requirement - complete by EOD' },
];

describe('Notifications component', () => {
  test('always displays the notifications title', () => {
    render(<Notifications />);
    expect(screen.getByText(/your notifications/i)).toBeInTheDocument();
  });

  test('hides the drawer content when displayDrawer is false', () => {
    render(<Notifications displayDrawer={false} notifications={notifications} />);

    expect(screen.getByText(/your notifications/i)).toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(screen.queryByText(/here is the list of notifications/i)).not.toBeInTheDocument();
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });

  test('shows the drawer content when displayDrawer is true', () => {
    render(<Notifications displayDrawer={true} notifications={notifications} />);

    expect(screen.getByText(/your notifications/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText(/here is the list of notifications/i)).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
  });

  test('shows the empty message when notifications is empty', () => {
    render(<Notifications displayDrawer={true} notifications={[]} />);

    expect(screen.getByText(/your notifications/i)).toBeInTheDocument();
    expect(screen.getByText(/no new notification for now/i)).toBeInTheDocument();
  });

  test('logs to the console when the close button is clicked', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
    render(<Notifications displayDrawer={true} notifications={notifications} />);

    fireEvent.click(screen.getByRole('button'));

    expect(spy).toHaveBeenCalledWith('Close button has been clicked');
    spy.mockRestore();
  });
});
