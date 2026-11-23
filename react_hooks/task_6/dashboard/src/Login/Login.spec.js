import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';

describe('Login component', () => {
  test('renders 2 labels, 2 inputs and 1 button', () => {
    const { container } = render(<Login />);

    expect(container.querySelectorAll('label')).toHaveLength(2);
    expect(container.querySelectorAll('input')).toHaveLength(3);
    expect(container.querySelector('input[type="submit"]')).toBeInTheDocument();
  });

  test('focuses the input when its label is clicked', async () => {
    const user = userEvent.setup();
    render(<Login />);

    await user.click(screen.getByText(/email/i));
    expect(screen.getByLabelText(/email/i)).toHaveFocus();

    await user.click(screen.getByText(/password/i));
    expect(screen.getByLabelText(/password/i)).toHaveFocus();
  });

  test('the submit button is disabled by default', () => {
    render(<Login />);
    expect(screen.getByRole('button', { name: /ok/i })).toBeDisabled();
  });

  test('the submit button is enabled only when email and password are valid', () => {
    render(<Login />);
    const email = screen.getByLabelText(/email/i);
    const password = screen.getByLabelText(/password/i);
    const submit = screen.getByRole('button', { name: /ok/i });

    fireEvent.change(email, { target: { value: 'not-an-email' } });
    fireEvent.change(password, { target: { value: 'longenough' } });
    expect(submit).toBeDisabled();

    fireEvent.change(email, { target: { value: 'test@example.com' } });
    fireEvent.change(password, { target: { value: 'short' } });
    expect(submit).toBeDisabled();

    fireEvent.change(password, { target: { value: 'longenough' } });
    expect(submit).toBeEnabled();
  });

  test('calls logIn with the email and password when the form is submitted', () => {
    
    const logIn = jest.fn();
    render(<Login logIn={logIn} />);

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /ok/i }));

    expect(logIn).toHaveBeenCalledTimes(1);
    expect(logIn).toHaveBeenCalledWith('test@example.com', 'password123');
  });

});
