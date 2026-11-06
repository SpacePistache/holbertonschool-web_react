import { render, screen, within, fireEvent, act } from '@testing-library/react';
import mockAxios from 'jest-mock-axios';
import App from './App';


const notificationsData = [
  { id: 1, type: 'default', value: 'New course available' },
  { id: 2, type: 'urgent', value: 'New resume available' },
  { id: 3, type: 'urgent', html: { __html: '' } },
];

const coursesData = [
  { id: 1, name: 'ES6', credit: 60 },
  { id: 2, name: 'Webpack', credit: 20 },
  { id: 3, name: 'React', credit: 40 },
];

afterEach(() => {
  mockAxios.reset();
});

describe('App component', () => {
  test('renders the login paragraph', () => {
    render(<App />);
    const el = screen.getByText(/login to access the full dashboard/i);
    expect(el).toBeInTheDocument();
  });

  test('renders the copyright footer', () => {
    render(<App />);
      const el = screen.getByText(/copyright \d{4} - holberton school/i);
    expect(el).toBeInTheDocument();
  });

  test('renders the h1 title', () => {
    render(<App />);
    const el = screen.getByRole('heading', { level: 1, name: /school dashboard/i });
    expect(el).toBeInTheDocument();
  });

  test('renders the logo image', () => {
    render(<App />);
    const el = screen.getByAltText(/holberton logo/i);
    expect(el).toBeInTheDocument();
  });

    test('renders 2 input elements', () => {
    render(<App />);
    const inputs = screen.getAllByLabelText(/email|password/i);
    expect(inputs).toHaveLength(2);
  });

  test('renders 2 label elements with Email and Password', () => {
    render(<App />);
    const emailLabel = screen.getByText(/^email/i);
    expect(emailLabel).toBeInTheDocument();
  });

  test('renders a button with the text OK', () => {
    render(<App />);
    const button = screen.getByRole('button', { name: /ok/i });
    expect(button).toBeInTheDocument();
  });
  test('renders Login when isLoggedIn is false', () => {
    render(<App />);
    expect(screen.getByText(/login to access the full dashboard/i)).toBeInTheDocument();
  });

  test('renders CourseList after logging in through the form', () => {
    render(<App />);

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /ok/i }));

    expect(screen.getByText(/available courses/i)).toBeInTheDocument();
    expect(screen.queryByText(/login to access the full dashboard/i)).not.toBeInTheDocument();
  });
  
  test('displays the News from the School section by default', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /news from the school/i })).toBeInTheDocument();
    expect(screen.getByText(/ipsum lorem ipsum dolor/i)).toBeInTheDocument();
  });

  test('renders Login under the "Log in to continue" heading when not logged in', () => {
    render(<App />);
    const heading = screen.getByRole('heading', { name: /log in to continue/i });
    expect(heading).toBeInTheDocument();
    const section = heading.closest('.bodySection');
    expect(within(section).getByRole('button', { name: /ok/i })).toBeInTheDocument();
  });

  test('clicking the close button hides the drawer', async () => {
    render(<App />);
    await act(async () => {
      mockAxios.mockResponseFor({ url: 'http://localhost:5173/notifications.json' }, { data: notificationsData });
    });
    
    expect(screen.getByText(/here is the list of notifications/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(screen.queryByText(/here is the list of notifications/i)).not.toBeInTheDocument();
  });

  test('logging in shows the CourseList and the logout section', () => {
    const { container } = render(<App />);
    expect(container.querySelector('#logoutSection')).not.toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /ok/i }));

    expect(screen.getByText(/available courses/i)).toBeInTheDocument();
    expect(container.querySelector('#logoutSection')).toHaveTextContent(/test@example.com/i);
  });

  test('clicking logout returns to the Login form', () => {
    const { container } = render(<App />);

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /ok/i }));

    fireEvent.click(screen.getByText(/logout/i));

    expect(screen.getByText(/login to access the full dashboard/i)).toBeInTheDocument();
    expect(container.querySelector('#logoutSection')).not.toBeInTheDocument();
  });

  test('clicking a notification removes it and logs a message', async () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    render(<App />);

    await act(async () => {
      mockAxios.mockResponseFor({ url: 'http://localhost:5173/notifications.json' }, { data: notificationsData });
    });

    fireEvent.click(screen.getByText(/your notifications/i));
    fireEvent.click(screen.getByText('New course available'));

    expect(screen.queryByText('New course available')).not.toBeInTheDocument();
    expect(logSpy).toHaveBeenCalledWith('Notification 1 has been marked as read');

    logSpy.mockRestore();
  });

    test('handleHideDrawer and handleDisplayDrawer toggle the drawer', async () => {
    render(<App />);

    await act(async () => {
      mockAxios.mockResponseFor({ url: 'http://localhost:5173/notifications.json' }, { data: notificationsData });
    });

    expect(screen.getByText(/here is the list of notifications/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(screen.queryByText(/here is the list of notifications/i)).not.toBeInTheDocument();

    fireEvent.click(screen.getByText(/your notifications/i));
    expect(screen.getByText(/here is the list of notifications/i)).toBeInTheDocument();
  });

  test('logIn updates the user: email shown, isLoggedIn true', () => {
    const { container } = render(<App />);

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /ok/i }));

    expect(container.querySelector('#logoutSection')).toHaveTextContent('test@example.com');
    expect(screen.getByText(/available courses/i)).toBeInTheDocument();
  });

  test('logOut resets the user: logged out, email and password cleared', () => {
    const { container } = render(<App />);

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /ok/i }));

    fireEvent.click(screen.getByText(/logout/i));

    expect(container.querySelector('#logoutSection')).not.toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toHaveValue('');
    expect(screen.getByLabelText(/password/i)).toHaveValue('');
  });

    test('fetches notifications when the App first loads', async () => {
    render(<App />);
    expect(mockAxios.get).toHaveBeenCalledWith('http://localhost:5173/notifications.json');

    await act(async () => {
      mockAxios.mockResponseFor({ url: 'http://localhost:5173/notifications.json' }, { data: notificationsData });
    });

    expect(screen.getByText('New course available')).toBeInTheDocument();
    expect(screen.getByText(/urgent requirement/i)).toBeInTheDocument();
  });


  test('fetches courses only once the user is logged in', async () => {
    render(<App />);
    expect(mockAxios.get).not.toHaveBeenCalledWith('http://localhost:5173/courses.json');

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /ok/i }));

    expect(mockAxios.get).toHaveBeenCalledWith('http://localhost:5173/courses.json');

    await act(async () => {
      mockAxios.mockResponseFor({ url: 'http://localhost:5173/courses.json' }, { data: coursesData });
    });

    expect(screen.getByText('ES6')).toBeInTheDocument();
  });

});
