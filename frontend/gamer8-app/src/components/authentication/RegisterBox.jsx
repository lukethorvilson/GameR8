import React, { useState } from 'react';
import RegisterInput from './RegisterInput';
import { useNavigate } from 'react-router-dom';
import Spinner from './../universal/Spinner';

function RegisterBox() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    passwordCheck: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  let errorTimeout;

  function handleError(message, seconds) {
    // check for previous timeout
    if (errorTimeout) {
      clearTimeout(errorTimeout);
    }
    setError(message);
    errorTimeout = setTimeout(() => {
      setError(null);
    }, 1000 * seconds);
  }

  async function handleRegisterSubmit(e) {
    e.preventDefault();
    // check for data in all fields, if missing throw new error:
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.username ||
      !formData.password ||
      !formData.passwordCheck
    ) {
      handleError(
        'Please fill in all data fields to register as a user!',
        30,
      );
      return;
    }
    // check for invalid password mismatch:
    if (formData.password !== formData.passwordCheck) {
      handleError(
        "Password check didn't match! Please re-enter passwords and double check them!",
        30,
      );
      return;
    }

    // make the register request:
    try {
      setIsLoading(true);
      const response = await fetch(
        'http://localhost:8000/gamer8/api/v1/users/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        },
      );
      const data = await response.json();
      setIsLoading(false);
      if (!response.ok) {
        handleError(data.message, 30);
        return;
      }
      navigate(response.ok ? '/login' : '/register');
    } catch (err) {
      console.error(err.message);
      setIsLoading(false);
      return;
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  return (
    <div className="mx-auto h-[65%] w-[60%] rounded-xl bg-cyan-950 px-4 py-8">
      <h1 className="col-span-2 mb-10 text-center font-header text-2xl font-bold text-yellow-300">
        Register
      </h1>
      {error && (
        <p className="mx-auto bg-red-500 p-4 text-base text-white">
          Registration Error: {error}
        </p>
      )}
      <form
        onSubmit={handleRegisterSubmit}
        className="row-span-3 grid h-[80%] w-[100%] grid-cols-2"
      >
        <RegisterInput
          label="First Name"
          name="firstName"
          id="firstName"
          isPassword={false}
          value={formData.firstName}
          onChange={handleChange}
        />
        <RegisterInput
          label="Last Name"
          name="lastName"
          id="lastName"
          isPassword={false}
          value={formData.lastName}
          onChange={handleChange}
        />
        <RegisterInput
          label="Email"
          name="email"
          id="email"
          isPassword={false}
          value={formData.email}
          onChange={handleChange}
        />
        <RegisterInput
          label="Username"
          name="username"
          isPassword={false}
          id="username"
          value={formData.username}
          onChange={handleChange}
        />
        <RegisterInput
          label="Password"
          name="password"
          id="password"
          isPassword={true}
          value={formData.password}
          onChange={handleChange}
        />
        <RegisterInput
          label="Re-type Password"
          name="passwordCheck"
          isPassword={true}
          id="passwordCheck"
          value={formData.passwordCheck}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="col-span-2 mx-auto h-[110%] w-[40%] rounded-md bg-yellow-300 font-header font-bold text-cyan-950"
        >
          {isLoading ? (
            <Spinner className="" />
          ) : (
            'Register'
          )}
        </button>
      </form>
    </div>
  );
}

export default RegisterBox;
