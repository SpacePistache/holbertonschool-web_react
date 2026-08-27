import { render, screen, fireEvent } from '@testing-library/react';
import Notifications from './Notifications';

const notifications = [
  { id: 1, type: 'default', value: 'New course available' },
  { id: 2, type: 'urgent', value: 'New resume available' },
  { id: 3, type: 'urgent', value: 'Urgent requirement - complete by EOD' },
];

describe('Notifications component', () => {
  test('renders the notifications title', () => {
    render(<Notifications notifications={notifications} />);
    expect(screen.getByText(/here is the list of notifications/i)).toBeInTheDocument();
  });

  test('renders a button element', () => {
    render(<Notifications notifications={notifications} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('renders 3 li elements with the right text', () => {
    render(<Notifications notifications={notifications} />);

    expect(screen.getAllByRole('listitem')).toHaveLength(3);
    expect(screen.getByText('New course available')).toBeInTheDocument();
    expect(screen.getByText('New resume available')).toBeInTheDocument();
  });

  test('logs to the console when the close button is clicked', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
    render(<Notifications notifications={notifications} />);

    fireEvent.click(screen.getByRole('button'));

    expect(spy).toHaveBeenCalledWith('Close button has been clicked');
    spy.mockRestore();
  });
});
