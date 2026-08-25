import { render, screen, fireEvent } from '@testing-library/react';
import Notifications from './Notifications';

describe('Notifications component', () => {
  test('renders the notifications title', () => {
    render(<Notifications />);
    const title = screen.getByText(/here is the list of notifications/i);
    expect(title).toBeInTheDocument();
  });

  test('renders a button element', () => {
    render(<Notifications />);
    const button = screen.getByRole('button', { name: /close/i });
    expect(button).toBeInTheDocument();
  });

  test('renders 3 li elements', () => {
    render(<Notifications />);
    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(3);
  });

  test('logs to the console when the close button is clicked', () => {
    // replace console.log with a fake we can inspect, so the real one stays quiet
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
    render(<Notifications />);

    fireEvent.click(screen.getByRole('button', { name: /close/i }));

    expect(spy).toHaveBeenCalledWith('Close button has been clicked');
    spy.mockRestore(); // put the real console.log back
  });
});
