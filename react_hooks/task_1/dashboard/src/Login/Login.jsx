import { useState } from 'react';
import WithLogging from '../HOC/WithLogging';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isFormValid = (email, password) => EMAIL_REGEX.test(email) && password.length >= 8;

function Login({ logIn = () => {}, email = '', password = '' }) {
  const [enableSubmit, setEnableSubmit] = useState(false);
  const [formData, setFormData] = useState({ email, password });

  const handleChangeEmail = (event) => {
    const newEmail = event.target.value;
    setFormData((prev) => ({ ...prev, email: newEmail }));
    setEnableSubmit(isFormValid(newEmail, formData.password));
  };

  const handleChangePassword = (event) => {
    const newPassword = event.target.value;
    setFormData((prev) => ({ ...prev, password: newPassword }));
    setEnableSubmit(isFormValid(formData.email, newPassword));
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    logIn(formData.email, formData.password);
  };

  return (
    <div className="App-body border-t-[3px] border-(--main-color) px-6 py-4 min-h-[40vh] max-[912px]:min-h-[419px] max-[912px]:px-1 max-[912px]:pt-5 max-[912px]:mt-0.5">
      <p className="mb-4 max-[912px]:text-xl max-[912px]:mb-8">Login to access the full dashboard</p>
      <form
        onSubmit={handleLoginSubmit}
        className="flex items-center gap-2 max-[912px]:flex-col max-[912px]:items-start max-[912px]:gap-0 max-[912px]:text-lg"
      >
        <label htmlFor="email">Email</label>
        <input
          className="border border-gray-400 rounded-sm px-1 max-[912px]:w-[60%] max-[912px]:mb-1 max-[912px]:border-gray-600 max-[912px]:rounded-md"
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChangeEmail}
        />
        <label htmlFor="password">Password</label>
        <input
          className="border border-gray-400 rounded-sm px-1 max-[912px]:w-[60%] max-[912px]:mb-1 max-[912px]:border-gray-600 max-[912px]:rounded-md"
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChangePassword}
        />
        <input
          className="border border-gray-400 rounded-sm px-1 max-[912px]:border-gray-600 max-[912px]:rounded-md max-[912px]:mt-0.5"
          type="submit"
          value="OK"
          disabled={!enableSubmit}
        />
      </form>
    </div>
  );
}

export default WithLogging(Login);
