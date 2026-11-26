import mockAxios from 'jest-mock-axios';
import { configureStore } from '@reduxjs/toolkit';
import coursesReducer, { fetchCourses } from '../courses/coursesSlice';
import { logout } from '../auth/authSlice';

describe('coursesSlice', () => {
  const initialState = {
    courses: [],
  };

  const coursesData = [
    { id: 1, name: 'ES6', credit: 60 },
    { id: 2, name: 'Webpack', credit: 20 },
    { id: 3, name: 'React', credit: 40 },
  ];

  afterEach(() => {
    mockAxios.reset();
  });

  test('returns the correct initial state by default', () => {
    expect(coursesReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  test('fetches the courses data correctly', async () => {
    const store = configureStore({
      reducer: { courses: coursesReducer },
    });

    const promise = store.dispatch(fetchCourses());
    expect(mockAxios.get).toHaveBeenCalledWith(
      'http://localhost:5173/courses.json'
    );
    mockAxios.mockResponse({ data: { courses: coursesData } });
    await promise;

    expect(store.getState().courses.courses).toEqual(coursesData);
  });

  test('resets the courses array when logout is dispatched', () => {
    const state = { courses: coursesData };

    const newState = coursesReducer(state, logout());

    expect(newState.courses).toEqual([]);
  });
});
