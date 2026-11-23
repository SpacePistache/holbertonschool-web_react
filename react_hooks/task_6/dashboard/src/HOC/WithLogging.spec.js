import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import WithLogging from './WithLogging';

class MockApp extends React.Component {
  render() {
    return <h1>Hello from Mock App Component</h1>;
  }
}

const MockAppWithLogging = WithLogging(MockApp);

describe('WithLogging HOC', () => {
  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });

  test('renders a heading with the text "Hello from Mock App Component"', () => {
    render(<MockAppWithLogging />);
    expect(
      screen.getByRole('heading', { name: /hello from mock app component/i })
    ).toBeInTheDocument();
  });

  test('logs on mount and before unmount', () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    const { unmount } = render(<MockAppWithLogging />);
    expect(logSpy).toHaveBeenCalledWith('Component MockApp is mounted');

    unmount();
    expect(logSpy).toHaveBeenCalledWith('Component MockApp is going to unmount');
  });

  test('sets the displayName to WithLogging(MockApp)', () => {
    expect(MockAppWithLogging.displayName).toBe('WithLogging(MockApp)');
  });
});
