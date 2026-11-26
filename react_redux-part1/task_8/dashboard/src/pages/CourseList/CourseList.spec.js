import { render, screen, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import mockAxios from 'jest-mock-axios';
import CourseList from './CourseList';
import rootReducer from '../../app/rootReducer';
import { fetchCourses } from '../../features/courses/coursesSlice';
import { logout } from '../../features/auth/authSlice';

const coursesData = [
  { id: 1, name: 'ES6', credit: 60 },
  { id: 2, name: 'Webpack', credit: 20 },
  { id: 3, name: 'React', credit: 40 },
];

const renderWithStore = (store) => {
  render(
    <Provider store={store}>
      <CourseList />
    </Provider>
  );
};

describe('CourseList', () => {
  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    mockAxios.reset();
    jest.restoreAllMocks();
  });

  test('displays the courses list after fetching the courses', async () => {
    const store = configureStore({ reducer: rootReducer });
    renderWithStore(store);

    await act(async () => {
      const promise = store.dispatch(fetchCourses());
      mockAxios.mockResponse({ data: { courses: coursesData } });
      await promise;
    });

    expect(screen.getByText('ES6')).toBeInTheDocument();
    expect(screen.getByText('Webpack')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
  });

  test('resets the courses array when logout is dispatched', () => {
    const store = configureStore({
      reducer: rootReducer,
      preloadedState: { courses: { courses: coursesData } },
    });

    store.dispatch(logout());
    renderWithStore(store);

    expect(store.getState().courses.courses).toEqual([]);
    expect(screen.getByText('No course available yet')).toBeInTheDocument();
  });
});
