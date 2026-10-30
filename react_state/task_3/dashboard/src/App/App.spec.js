import { render, screen, within, fireEvent } from '@testing-library/react';
import App from './App';


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

  test('clicking "Your notifications" opens the drawer', () => {
    render(<App />);
    expect(screen.queryByText(/here is the list of notifications/i)).not.toBeInTheDocument();

    fireEvent.click(screen.getByText(/your notifications/i));
    expect(screen.getByText(/here is the list of notifications/i)).toBeInTheDocument();
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

});
