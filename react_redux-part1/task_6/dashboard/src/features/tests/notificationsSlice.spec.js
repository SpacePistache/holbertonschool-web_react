import mockAxios from 'jest-mock-axios';
import { configureStore } from '@reduxjs/toolkit';
import notificationsReducer, {
  fetchNotifications,
  markNotificationAsRead,
  showDrawer,
  hideDrawer,
} from '../notifications/notificationsSlice';
import { getLatestNotification } from '../../utils/utils';

describe('notificationsSlice', () => {
  const initialState = {
    notifications: [],
    displayDrawer: true,
  };

  const notificationsData = [
    { id: 1, type: 'default', value: 'New course available' },
    { id: 2, type: 'urgent', value: 'New resume available' },
    { id: 3, type: 'urgent', html: { __html: '' } },
  ];

  afterEach(() => {
    mockAxios.reset();
    jest.restoreAllMocks();
  });

  test('returns the correct initial state by default', () => {
    expect(notificationsReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  test('fetches notifications data correctly', async () => {
    const store = configureStore({
      reducer: { notifications: notificationsReducer },
    });

    const promise = store.dispatch(fetchNotifications());
    expect(mockAxios.get).toHaveBeenCalledWith(
      'http://localhost:5173/notifications.json'
    );
    mockAxios.mockResponse({ data: { notifications: notificationsData } });
    await promise;

    expect(store.getState().notifications.notifications).toEqual([
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
      { id: 3, type: 'urgent', html: { __html: getLatestNotification() } },
    ]);
  });

  test('removes a notification when markNotificationAsRead is dispatched', () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    const state = { ...initialState, notifications: notificationsData };

    const newState = notificationsReducer(state, markNotificationAsRead(2));

    expect(newState.notifications).toEqual([
      notificationsData[0],
      notificationsData[2],
    ]);
    expect(logSpy).toHaveBeenCalledWith('Notification 2 has been marked as read');
  });

  test('toggles displayDrawer with showDrawer and hideDrawer', () => {
    const hidden = notificationsReducer(initialState, hideDrawer());
    expect(hidden.displayDrawer).toBe(false);

    const shown = notificationsReducer(hidden, showDrawer());
    expect(shown.displayDrawer).toBe(true);
  });
});
