import { render, screen, fireEvent, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import mockAxios from 'jest-mock-axios';
import Notifications from './Notifications';
import rootReducer from '../../app/rootReducer';
import { fetchNotifications } from '../../features/notifications/notificationsSlice';

const notificationsData = [
  { id: 1, type: 'default', value: 'New course available' },
  { id: 2, type: 'urgent', value: 'New resume available' },
  { id: 3, type: 'urgent', html: { __html: '' } },
];

const renderWithNotifications = async () => {
  const store = configureStore({ reducer: rootReducer });
  render(
    <Provider store={store}>
      <Notifications />
    </Provider>
  );

  await act(async () => {
    const promise = store.dispatch(fetchNotifications());
    mockAxios.mockResponse({ data: { notifications: notificationsData } });
    await promise;
  });

  return store;
};

describe('Notifications', () => {
  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    mockAxios.reset();
    jest.restoreAllMocks();
  });

  test('displays the fetched notification items', async () => {
    await renderWithNotifications();

    expect(screen.getByText('Here is the list of notifications')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
    expect(screen.getByText('New course available')).toBeInTheDocument();
    expect(screen.getByText('Urgent requirement')).toBeInTheDocument();
  });

  test('sets displayDrawer to false when the drawer is closed', async () => {
    const store = await renderWithNotifications();

    fireEvent.click(screen.getByRole('button', { name: /close/i }));

    expect(store.getState().notifications.displayDrawer).toBe(false);
    expect(screen.queryByText('Here is the list of notifications')).not.toBeInTheDocument();
  });

  test('sets displayDrawer to true when the drawer is opened', async () => {
    const store = await renderWithNotifications();

    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    fireEvent.click(screen.getByText('Your notifications'));

    expect(store.getState().notifications.displayDrawer).toBe(true);
    expect(screen.getByText('Here is the list of notifications')).toBeInTheDocument();
  });

  test('removes a notification when it is marked as read', async () => {
    const store = await renderWithNotifications();

    fireEvent.click(screen.getByText('New course available'));

    expect(screen.queryByText('New course available')).not.toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
    expect(store.getState().notifications.notifications.map((n) => n.id)).toEqual([2, 3]);
    expect(console.log).toHaveBeenCalledWith('Notification 1 has been marked as read');
  });
});
