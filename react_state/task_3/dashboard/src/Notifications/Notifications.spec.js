import { render, screen, fireEvent } from '@testing-library/react';
import Notifications from './Notifications';

const notifications = [
  { id: 1, type: 'default', value: 'New course available' },
  { id: 2, type: 'urgent', value: 'New resume available' },
  { id: 3, type: 'urgent', value: 'Urgent requirement - complete by EOD' },
];

describe('Notifications ShouldComponentUpdate', () => {
  
  const initialList = [
    { id: 1, type: 'default', value: 'New course available' },
    { id: 2, type: 'urgent', value: 'New resume available' },
  ];

  test('does not re-render when the notifications length stays the same', () => {
    const sameLengthList = [
      { id: 1, type: 'default', value: 'Changed notification 1' },
      { id: 2, type: 'urgent', value: 'Changed notification 2' },
    ];

    const { rerender } = render(
      <Notifications displayDrawer={true} notifications={initialList} />
    );
    rerender(<Notifications displayDrawer={true} notifications={sameLengthList} />);

    expect(screen.getByText('New course available')).toBeInTheDocument();
    expect(screen.queryByText('Changed notification 1')).not.toBeInTheDocument();
  });

  test('re-renders when the notifications length changes', () => {
    const longerList = [
      ...initialList,
      { id: 3, type: 'urgent', value: 'A brand new notification' },
    ];

    const { rerender } = render(
      <Notifications displayDrawer={true} notifications={initialList} />
    );
    rerender(<Notifications displayDrawer={true} notifications={longerList} />);

    expect(screen.getByText('A brand new notification')).toBeInTheDocument();
  });
  
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

  test('clicking on the menu item calls handleDisplayDrawer', () => {
    const handleDisplayDrawer = jest.fn();
    render(<Notifications displayDrawer={false} handleDisplayDrawer={handleDisplayDrawer} />);

    fireEvent.click(screen.getByText(/your notifications/i));
    expect(handleDisplayDrawer).toHaveBeenCalledTimes(1);
  });

  test('clicking on the close button calls handleHideDrawer', () => {
    const handleHideDrawer = jest.fn();
    const notifications = [{ id: 1, type: 'default', value: 'New course available' }];

    render(
      <Notifications displayDrawer={true} notifications={notifications} handleHideDrawer={handleHideDrawer} />
    );

    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(handleHideDrawer).toHaveBeenCalledTimes(1);
  });

});
