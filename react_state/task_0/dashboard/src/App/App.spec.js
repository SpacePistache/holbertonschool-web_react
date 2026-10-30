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
    render(<App isLoggedIn={false} />);
    expect(screen.getByText(/login to access the full dashboard/i)).toBeInTheDocument();
  });

  test('renders CourseList when isLoggedIn is true', () => {
    render(<App isLoggedIn={true} />);
    expect(screen.getByText(/available courses/i)).toBeInTheDocument();
  });
  
  test('displays the News from the School section by default', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /news from the school/i })).toBeInTheDocument();
    expect(screen.getByText(/ipsum lorem ipsum dolor/i)).toBeInTheDocument();
  });

  test('renders Login under the "Log in to continue" heading when not logged in', () => {
    render(<App isLoggedIn={false} />);
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

});
