import { useState } from 'react';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isFormValid = (email, password) => EMAIL_REGEX.test(email) && password.length >= 8;

function useLogin(onLogin = () => {}, initialEmail = '', initialPassword = '') {
  const [formData, setFormData] = useState({ email: initialEmail, password: initialPassword });
  const [enableSubmit, setEnableSubmit] = useState(false);

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
    onLogin(formData.email, formData.password);
  };

  return {
    email: formData.email,
    password: formData.password,
    enableSubmit,
    handleChangeEmail,
    handleChangePassword,
    handleLoginSubmit,
  };
}

export default useLogin;
